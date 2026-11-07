import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestBill, RestBillDocument } from '../schemas/rest-bill.schema';
import { RestTable, RestTableDocument } from '../schemas/rest-table.schema';

@Injectable()
export class RestDashboardService {
  constructor(
    @InjectModel(RestBill.name)
    private readonly restBillModel: Model<RestBillDocument>,
    @InjectModel(RestTable.name)
    private readonly restTableModel: Model<RestTableDocument>,
  ) {}

  async getAnalytics() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // All-time bills
    const allBills = await this.restBillModel.find().lean().exec();

    let allTimeCollection = 0;
    let todayCollection = 0;
    let todayBillsCount = 0;

    const paymentModes: Record<string, { count: number; amount: number }> = {
      Cash: { count: 0, amount: 0 },
      'UPI / QR': { count: 0, amount: 0 },
      Card: { count: 0, amount: 0 },
      Other: { count: 0, amount: 0 },
    };

    const itemSalesMap = new Map<string, { name: string; quantity: number; revenue: number }>();

    for (const bill of allBills) {
      const billTotal = bill.total || 0;
      allTimeCollection += billTotal;

      const billDate = new Date(bill.createdAt || bill.settledAt || now);
      const isToday = billDate >= startOfToday && billDate <= endOfToday;

      if (isToday) {
        todayCollection += billTotal;
        todayBillsCount += 1;
      }

      // Payment mode breakdown
      const mode = bill.paymentMode || 'Cash';
      if (!paymentModes[mode]) {
        paymentModes[mode] = { count: 0, amount: 0 };
      }
      paymentModes[mode].count += 1;
      paymentModes[mode].amount += billTotal;

      // Item sales aggregation
      for (const item of bill.items || []) {
        const key = item.name || item.itemId;
        const current = itemSalesMap.get(key) || { name: item.name, quantity: 0, revenue: 0 };
        current.quantity += item.quantity || 1;
        current.revenue += item.itemTotal || (item.price || 0) * (item.quantity || 1);
        itemSalesMap.set(key, current);
      }
    }

    const topSellingItems = Array.from(itemSalesMap.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // Tables occupancy status
    const allTables = await this.restTableModel.find().lean().exec();
    const totalTables = allTables.length;
    const occupiedTables = allTables.filter((t) => t.status === 'occupied').length;
    const availableTables = totalTables - occupiedTables;

    return {
      todayCollection,
      todayBillsCount,
      allTimeCollection,
      allTimeBillsCount: allBills.length,
      averageBillValue: allBills.length > 0 ? Math.round(allTimeCollection / allBills.length) : 0,
      paymentModes,
      topSellingItems,
      tableStats: {
        total: totalTables,
        occupied: occupiedTables,
        available: availableTables,
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

