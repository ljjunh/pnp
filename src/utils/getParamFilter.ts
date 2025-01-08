import { FilterType } from '@/schemas/rooms';

/**
 * query param에서 filter 정보를 가져와 filter에 담는 함수
 *
 * @param {URLSearchParams} searchParams query param 정보
 */
export const getParamFilter = (searchParams: { [key: string]: string | string[] | undefined }) => {
  const {
    roomType,
    minPrice,
    maxPrice,
    bedroom,
    bed,
    bathroom,
    amenities,
    option,
    language,
    property,
    location,
    checkIn,
    checkOut,
    guest,
    baby,
    pet,
  } = searchParams;

  const filter: FilterType = {
    roomType: roomType as 'Entire' | 'Private' | null,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedroom: bedroom ? Number(bedroom) : undefined,
    bed: bed ? Number(bed) : undefined,
    bathroom: bathroom ? Number(bathroom) : undefined,
    amenityArray: typeof amenities === 'string' ? amenities.split(',') : [],
    option: typeof option === 'string' ? option.split(',') : [],
    language: typeof language === 'string' ? language.split(',').map(Number) : [],
    property: property ? Number(property) : undefined,
    location: typeof location === 'string' ? location : undefined,
    checkIn: typeof checkIn === 'string' ? checkIn : undefined,
    checkOut: typeof checkOut === 'string' ? checkOut : undefined,
    guest: guest ? Number(guest) : undefined,
    baby: baby ? Number(baby) : undefined,
    pet: pet ? Number(pet) : undefined,
  };

  return filter;
};
