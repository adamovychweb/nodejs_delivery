import { TruckTypesEnum } from '~modules/trucks/enums/truck-types.enum';

const TL_SPRINTER = TruckTypesEnum.SPRINTER;
const TL_SMALL_STRAIGHT = TruckTypesEnum.SMALL_STRAIGHT;
const TL_LARGE_STRAIGHT = TruckTypesEnum.LARGE_STRAIGHT;

export const truckList = {
  [TL_SPRINTER]: {
    payload: 1700,
    dimensions: {
      width: 250,
      length: 300,
      height: 170
    }
  },
  [TL_SMALL_STRAIGHT]: {
    payload: 2500,
    dimensions: {
      width: 250,
      length: 500,
      height: 170
    }
  },
  [TL_LARGE_STRAIGHT]: {
    payload: 4000,
    dimensions: {
      width: 350,
      length: 700,
      height: 200
    }
  }
};
