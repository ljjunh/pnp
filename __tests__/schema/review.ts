import { createReviewSchema, updateReviewSchema } from '@/schemas';
import { z } from 'zod';

const testReviewSchema = (schemaName: string, schema: z.ZodSchema) => {
  describe(schemaName, () => {
    it('입력 값이 정상이라면 유효성 검사를 통과해야 합니다', () => {
      const input = {
        accuracy: 5,
        checkIn: 4,
        cleanliness: 3,
        communication: 5,
        location: 4,
        value: 5,
        content: '좋은 숙소였습니다',
      };

      expect(schema.safeParse(input).success).toBeTruthy();
    });

    it('내용은 필수 입력 값 입니다.', () => {
      const input = {
        accuracy: 5,
        checkIn: 4,
        cleanliness: 3,
        communication: 5,
        location: 4,
        value: 5,
      };

      const parse = schema.safeParse(input);
      expect(parse.success).toBeFalsy();
      expect(parse.error?.issues[0].message).toBe('내용은 필수 입력입니다');
    });

    it('내용은 최소 1자 이상이어야 합니다.', () => {
      const input = {
        accuracy: 5,
        checkIn: 4,
        cleanliness: 3,
        communication: 5,
        location: 4,
        value: 5,
        content: '',
      };

      const parse = schema.safeParse(input);
      expect(parse.success).toBeFalsy();
      expect(parse.error?.issues[0].message).toBe('내용은 최소 1자 이상이어야 합니다');
    });

    it('평점은 숫자가 아니라면 유효성 검사에 실패해야 합니다', () => {
      const input = {
        accuracy: '5',
        checkIn: 4,
        cleanliness: 3,
        communication: 5,
        location: 4,
        value: 5,
        content: '좋은 숙소였습니다',
      };

      const parse = schema.safeParse(input);
      expect(parse.success).toBeFalsy();
      expect(parse.error?.issues[0].message).toBe('평점은 숫자여야 합니다');
    });

    it('평점은 1점 미만일 수 없습니다.', () => {
      const input = {
        accuracy: 0,
        checkIn: 4,
        cleanliness: 3,
        communication: 5,
        location: 4,
        value: 5,
        content: '좋은 숙소였습니다',
      };

      const parse = schema.safeParse(input);
      expect(parse.success).toBeFalsy();
      expect(parse.error?.issues[0].message).toBe('평점은 1에서 5 사이여야 합니다');
    });

    it('평점은 5점을 넘을 수 없습니다.', () => {
      const input = {
        accuracy: 5,
        checkIn: 4,
        cleanliness: 3,
        communication: 5,
        location: 4,
        value: 6,
        content: '좋은 숙소였습니다',
      };

      const parse = schema.safeParse(input);
      expect(parse.success).toBeFalsy();
      expect(parse.error?.issues[0].message).toBe('평점은 1에서 5 사이여야 합니다');
    });
  });
};

testReviewSchema('createReviewSchema', createReviewSchema);
testReviewSchema('updateReviewSchema', updateReviewSchema);
