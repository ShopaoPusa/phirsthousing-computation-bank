
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const units = {
  "Unna Regular": {
    lotArea: 88,
    floorArea: 54,
    tcp: 4302505,
    reservationFee: 30000,
  },
  Corin: {
    lotArea: 100,
    floorArea: 66,
    tcp: 5100000,
    reservationFee: 30000,
  },
  Charles: {
    lotArea: 110,
    floorArea: 80,
    tcp: 5900000,
    reservationFee: 30000,
  },
};

export default function HousingComputationApp() {
  const [selectedUnit, setSelectedUnit] = useState("Unna Regular");
  const unit = units[selectedUnit];

  const downpaymentTotal = unit.tcp * 0.10;
  const monthlyDownpayment = parseFloat((downpaymentTotal / 12).toFixed(2));
  const lastMonthDown = parseFloat((downpaymentTotal - monthlyDownpayment * 11).toFixed(2));
  const loanableAmount = unit.tcp * 0.90;

  const amortization = {
    5: parseFloat(((loanableAmount * 0.01 * Math.pow(1.01, 60)) / (Math.pow(1.01, 60) - 1)).toFixed(2)),
    10: parseFloat(((loanableAmount * 0.01 * Math.pow(1.01, 120)) / (Math.pow(1.01, 120) - 1)).toFixed(2)),
    15: parseFloat(((loanableAmount * 0.01 * Math.pow(1.01, 180)) / (Math.pow(1.01, 180) - 1)).toFixed(2)),
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-4">
          <div>
            <Label>Choose Unit Type</Label>
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              {Object.keys(units).map((unitName) => (
                <SelectItem key={unitName} value={unitName}>
                  {unitName}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Lot Area (sqm)</Label>
              <Input value={unit.lotArea} readOnly />
            </div>
            <div>
              <Label>Floor Area (sqm)</Label>
              <Input value={unit.floorArea} readOnly />
            </div>
            <div>
              <Label>Total Contract Price (PHP)</Label>
              <Input value={unit.tcp.toLocaleString()} readOnly />
            </div>
            <div>
              <Label>Reservation Fee (PHP)</Label>
              <Input value={unit.reservationFee.toLocaleString()} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-lg font-semibold">10% in 12 Months Breakdown</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Monthly Downpayment (1st to 11th)</Label>
              <Input value={monthlyDownpayment.toLocaleString()} readOnly />
            </div>
            <div>
              <Label>Last Month Downpayment (12th)</Label>
              <Input value={lastMonthDown.toLocaleString()} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-lg font-semibold">Loan & Amortization</h2>
          <div>
            <Label>Loanable Amount (PHP)</Label>
            <Input value={loanableAmount.toLocaleString()} readOnly />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div><Label>Monthly Amortization - 5 yrs:</Label> ₱{amortization[5].toLocaleString()}</div>
            <div><Label>Monthly Amortization - 10 yrs:</Label> ₱{amortization[10].toLocaleString()}</div>
            <div><Label>Monthly Amortization - 15 yrs:</Label> ₱{amortization[15].toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
