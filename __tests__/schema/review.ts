import { createReviewSchema } from '@/schemas';

describe('createReviewSchema', () => {
  it('입력 값이 정상이라면 유효성 검사를 통과해야 합니다', () => {
    const input = {
      rating: 5,
      content: '좋은 숙소였습니다',
    };

    expect(createReviewSchema.safeParse(input).success).toBeTruthy();
  });

  it('평점은 숫자가 아니라면 유효성 검사에 실패해야 합니다', () => {
    const input = {
      rating: '5',
      content: '좋은 숙소였습니다',
    };

    const parse = createReviewSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('평점은 숫자여야 합니다');
  });

  it('평점은 1점 미만일 수 없습니다.', () => {
    const input = {
      rating: 0,
      content: '좋은 숙소였습니다',
    };

    const parse = createReviewSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('평점은 1에서 5 사이여야 합니다');
  });

  it('평점은 5점을 넘을 수 없습니다.', () => {
    const input = {
      rating: 6,
      content: '좋은 숙소였습니다',
    };

    const parse = createReviewSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('평점은 1에서 5 사이여야 합니다');
  });
});

describe('updateReviewSchema', () => {
  it('입력 값이 정상이라면 유효성 검사를 통과해야 합니다', () => {
    const input = {
      rating: 5,
      content: '좋은 숙소였습니다',
    };

    expect(createReviewSchema.safeParse(input).success).toBeTruthy();
  });

  it('평점은 숫자가 아니라면 유효성 검사에 실패해야 합니다', () => {
    const input = {
      rating: '5',
      content: '좋은 숙소였습니다',
    };

    const parse = createReviewSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('평점은 숫자여야 합니다');
  });

  it('평점은 1점 미만일 수 없습니다.', () => {
    const input = {
      rating: 0,
      content: '좋은 숙소였습니다',
    };

    const parse = createReviewSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('평점은 1에서 5 사이여야 합니다');
  });

  it('평점은 5점을 넘을 수 없습니다.', () => {
    const input = {
      rating: 6,
      content: '좋은 숙소였습니다',
    };

    const parse = createReviewSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('평점은 1에서 5 사이여야 합니다');
  });
});
