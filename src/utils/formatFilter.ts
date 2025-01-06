import { FilterType } from '@/schemas/rooms';

/**
 * 필터 정보로 query param 주소를 리턴하는 함수
 *
 * @param {FilterType} filter 필터 정보
 */
export const formatFilter = (filter: FilterType) => {
  const {
    roomType,
    minPrice,
    maxPrice,
    bedroom,
    bed,
    bathroom,
    amenityArray,
    option,
    language,
    property,
    location,
    checkIn,
    checkOut,
    guest,
    baby,
    pet,
  } = filter;

  const params = new URLSearchParams();

  if (roomType) {
    params.append('roomType', roomType);
  }

  if (minPrice) {
    params.append('minPrice', minPrice.toString());
  }

  if (maxPrice) {
    params.append('maxPrice', maxPrice.toString());
  }

  if (bedroom) {
    params.append('bedroom', bedroom.toString());
  }

  if (bed) {
    params.append('bed', bed.toString());
  }

  if (bathroom) {
    params.append('bathroom', bathroom.toString());
  }

  if (amenityArray.length > 0) {
    params.append('amenities', amenityArray.join(','));
  }

  if (option.length > 0) {
    params.append('option', option.join(','));
  }

  if (language.length > 0) {
    params.append('language', language.join(','));
  }

  if (property) {
    params.append('property', property.toString());
  }

  if (location) {
    params.append('location', location.toString());
  }

  if (checkIn) {
    params.append('checkIn', checkIn);
  }

  if (checkOut) {
    params.append('checkOut', checkOut);
  }

  if (guest || baby || pet) {
    params.append('capacity', ((guest || 0) + (baby || 0) + (pet || 0)).toString());
  }

  return params;
};
