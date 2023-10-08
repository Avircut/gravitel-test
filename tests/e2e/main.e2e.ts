import AuthPage from '../pages/auth.page';

describe('AuthPage', () => {
  it('Should Auth with correct credentials', async () => {
    await AuthPage.login('UserOne', 'pass', true);
  });
  it('Shouldnt Auth with invalid credentials', () => {
    expect(async () => { await AuthPage.login('user', 'pass'); }).rejects.toThrow(Error('Не удалось авторизоваться'));
  });
});
