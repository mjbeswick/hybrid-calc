const GallonsPerLitre = 4.54609;
const LitresPerGallon = 1 / GallonsPerLitre;
const MilesPerKm = 1.60934;
const KmPerMile = 1 / MilesPerKm;

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
    fuelEconomy: {
      units: FuelEconomyUnits.milesPerGallon,
      value: 0.0
    }
  };

  hybridVehicle = {
    fuelEconomy: {
      units: FuelEconomyUnits.milesPerGallon,
      value: 0.0
    },
    evEconomy: {
      units: EvEconomyUnits.milesPerKwh,
      value: 0.0
    },
    fuelToEvMin: 1.0,
    fuelToEvMax: 0.0
  };

  constructor() { }

  getFuelCostMpg() {
    return this.fuelCost.units === FuelCostUnits.perGallon ? this.fuelCost.value : this.fuelCost.value / LitresPerGallon;
  }

  getPnnualDistanceMiles() {
    return this.annualDistance.units === DistanceUnits.miles ? this.annualDistance.value : this.annualDistance.value / KmPerMile
  }

  getFuelEconomyMpg(units: FuelEconomyUnits, value: number) {
    switch (units) {
      case FuelEconomyUnits.milesPerGallon:
        return value;

      case FuelEconomyUnits.kilometersPerGallon:
        return value / KmPerMile;

      case FuelEconomyUnits.milesPerLitre:
        return value / LitresPerGallon;

      case FuelEconomyUnits.kilometersPerLitre:
        return value * KmPerMile * LitresPerGallon;
    }
  }

  getEvEconomyMkwh(units: EvEconomyUnits, value: number) {
    return units === EvEconomyUnits.milesPerKwh ? value : value / KmPerMile;
  }

  calculate() {
    const fuelCostMpg = this.getFuelCostMpg()
    const electricityCost = this.electricityCost;
    const annualDistanceMiles = this.getPnnualDistanceMiles();

    const { units: fuelUnitsP, value: fuelValueP } = this.petrolVehicle.fuelEconomy;
    const fuelEconomyP = this.getFuelEconomyMpg(fuelUnitsP, fuelValueP);

    const { units: fuelUnitsH, value: fuelValueH } = this.hybridVehicle.fuelEconomy;
    const fuelEconomyH = this.getFuelEconomyMpg(fuelUnitsH, fuelValueH);

    const { units: evUnitsH, value: evValueH } = this.hybridVehicle.fuelEconomy;
    const evEconomyH = this.getEvEconomyMkwh(evUnitsH, evValueH);

    const fuelGallonsMin = annualDistanceMiles
    const fuelGallonsMax = annualDistanceMiles
    const electricityMin = annualDistanceMiles
    const electricityMax = annualDistanceMiles

    return {
      petrolVehicle: {
        fuelCost: annualDistanceMiles * fuelCostMpg;
      },
      hybridVehicle: {
        fuelCostMax: annualDistanceMiles * fuelCostMpg * (1 / this.hybridVehicle.fuelToEvMax),
        fuelCostMin: annualDistanceMiles * fuelCostMpg * this.hybridVehicle.fuelToEvMin,
        electricityCostMax: annualDistanceMiles * 
        electricityCostMin: 
      }
    }
  }
