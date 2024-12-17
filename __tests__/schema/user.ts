import { updateUserSchema } from '@/schemas';

describe('updateUserSchema', () => {
  it('입력 값이 정상이라면 유효성 검사를 통과해야 합니다', () => {
    const input = {
      about: '안녕하세요',
      school: '대학교',
      job: '개발자',
      address: '서울',
    };

    expect(updateUserSchema.safeParse(input).success).toBeTruthy();
  });

  it('자기소개가 입력되지 않으면 유효성 검사에 실패해야 합니다', () => {
    const input = {
      school: '대학교',
      job: '개발자',
      address: '서울',
    };

    const parse = updateUserSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('자기소개는 필수 입력 항목입니다');
  });

  it('생일 입력은 YYYY-MM-DD 형식이어야 합니다', () => {
    const input = {
      about: '안녕하세요',
      school: '대학교',
      job: '개발자',
      address: '서울',
      birth: '1990-01-01',
    };

    expect(updateUserSchema.safeParse(input).success).toBeTruthy();
  });

  it('만약, 생일 입력 형식이 올바르지 않다면 유효성 검사에 실패해야 합니다', () => {
    const input = {
      about: '안녕하세요',
      school: '대학교',
      job: '개발자',
      address: '서울',
      birth: '1990-01',
    };

    const parse = updateUserSchema.safeParse(input);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.issues[0].message).toBe('올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)');
  });
});
