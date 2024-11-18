import { AuthService } from '@common/services/auth.service';

export const telegramUserInitializer = (authService: AuthService) => () => {
  const data = getTelegramUserData(); // mockUser;
  return authService.telegramLogin(data);
};
const getTelegramUserData = () => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    try {
      tg.requestFullscreen();
    } catch (e) {
      console.error(e);
    }
    return (window as any).Telegram.Utils.urlParseQueryString(tg.initData);
  }
};
