describe("네비게이션 테스트", () => {
  it("should navigate to the test page", () => {
    // index 페이지에서 시작
    cy.visit("/");

    // "test"를 포함하는 href 속성을 가진 링크를 찾아 클릭
    cy.get('a[href*="test"]').click();

    // 새로운 url에 "/test"가 포함되어야 함
    cy.url().should("include", "/test");

    // 새로운 페이지에는 "Test"라는 h1 요소가 있어야 함
    cy.get("h1").contains("Test");
  });
});
