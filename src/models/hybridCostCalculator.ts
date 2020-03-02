const GallonsPerLitre = 4.54609
const LitresPerGallon = 1 / GallonsPerLitre
const MilesPerKm = 1.60934
const KmPerMile = 1 / MilesPerKm

export enum DistanceUnits {
  miles,
  kilometers
};

export enum FuelCostUnits {
  perLitre,
  perGallon
};

export enum ElectricityCostUnits {
  perKWh
};

export enum FuelEconomyUnits {
  milesPerGallon,
  kilometersPerGallon,
  milesPerLitre,
  kilometersPerLitre
};

export enum EvEconomyUnits {
  milesPerKwh,
  kilometersPerKwh
};

export class HybridCostCalculator {
  fuelCost = {
    units: FuelCostUnits.perGallon,
    value: 0,
  };

  electricityCost = {
    units: ElectricityCostUnits.perKWh,
    value: 0
  };

  annualDistance = {
    units: DistanceUnits.miles,
    value: 0,
  };

  petrolVehicle = {
    economyFuel: {
      units: FuelEconomyUnits.milesPerGallon,
      value: 0.0
    }
  };

  hybridVehicle = {
    economyFuel: {
      units: FuelEconomyUnits.milesPerGallon,
      value: 0.0
    },
    economyEv: {
      units: EvEconomyUnits.milesPerKwh,
      value: 0.0
    },
    fuelToEvMin: 1.0,
    fuelToEvMax: 0.0
  };

  getFuelCostPerGallon() {
    return this.fuelCost.units === FuelCostUnits.perGallon ? this.fuelCost.value : this.fuelCost.value / LitresPerGallon
  }

  getPnnualDistanceMiles() {
    return this.annualDistance.units === DistanceUnits.miles ? this.annualDistance.value : this.annualDistance.value / KmPerMile
  }

  getFuelEconomyMpg(units: FuelEconomyUnits, value: number) {
    switch (units) {
      case FuelEconomyUnits.milesPerGallon:
        return value

      case FuelEconomyUnits.kilometersPerGallon:
        return value / KmPerMile

      case FuelEconomyUnits.milesPerLitre:
        return value / LitresPerGallon

      case FuelEconomyUnits.kilometersPerLitre:
        return value * KmPerMile * LitresPerGallon
    }
  }

  getEvEconomyMkwh(units: EvEconomyUnits, value: number) {
    return units === EvEconomyUnits.milesPerKwh ? value : value / KmPerMile
  }

  calculate() {
    const fuelCostPerGallon = this.getFuelCostPerGallon()
    const electricityCostPerKwh = this.electricityCost.units
    const annualDistanceMiles = this.getPnnualDistanceMiles()

    const { units: fuelUnitsP, value: fuelValueP } = this.petrolVehicle.economyFuel
    const fuelEconomyP = this.getFuelEconomyMpg(fuelUnitsP, fuelValueP)

    const { units: fuelUnitsH, value: fuelValueH } = this.hybridVehicle.economyFuel
    const fuelEconomyH = this.getFuelEconomyMpg(fuelUnitsH, fuelValueH)

    const { units: evUnitsH, value: evValueH } = this.hybridVehicle.economyEv
    const evEconomyH = this.getEvEconomyMkwh(evUnitsH, evValueH)

    const costPerMileFuelP = fuelCostPerGallon / fuelEconomyP
    const costPerMileFuelH = fuelCostPerGallon / fuelEconomyH
    const costPerMileElectricity = electricityCostPerKwh / evEconomyH

    const petrolVehicle = {
      costFuel: annualDistanceMiles * costPerMileFuelP
    }

    const hybridVehicle = {
      costFuelMax: annualDistanceMiles * costPerMileFuelH * this.hybridVehicle.fuelToEvMax,
      costFuelMin: annualDistanceMiles * costPerMileFuelH * this.hybridVehicle.fuelToEvMin,
      costElectricityMax: annualDistanceMiles * costPerMileElectricity * (1 / this.hybridVehicle.fuelToEvMax),
      costElectricityMin: annualDistanceMiles * costPerMileElectricity * (1 / this.hybridVehicle.fuelToEvMin)
    }

    return {
      petrolVehicle,
      hybridVehicle
    }
  }
}