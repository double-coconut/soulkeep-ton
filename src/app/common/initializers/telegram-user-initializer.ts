import { AuthService } from '@common/services/auth.service';

export const telegramUserInitializer = (authService: AuthService) => () => {
  const data = getTelegramUserData(); // mockUser;
  return authService.telegramLogin(data);
};
const getTelegramUserData = () => {
  const tg = (window as any).Telegram?.WebApp;
  return mockData;
  if (tg) {
    try {
      tg.requestFullscreen();
    } catch (e) {
      console.error(e);
    }
    return (window as any).Telegram.Utils.urlParseQueryString(tg.initData);
  }
};

const mockData = {
  query_id: 'AAHInn0kAAAAAMiefSQh8uCC',
  user: '{"id":612212424,"first_name":"Gevorg","last_name":"Avetisyan","username":"avgevorg","language_code":"en","allows_write_to_pm":true,"photo_url":"https:\\/\\/t.me\\/i\\/userpic\\/320\\/B-PlhCF7mEHJ4vSKM44W2pAzj_ZP76xZCIiDwuGC8Oo.svg"}',
  auth_date: '1731862411',
  signature:
    'BCvm6t80j-6nIVgfmat4SUkfcjD9wvhrVbHZ7N_ZsgsQC-69ZlvOua2BSK4rrKrSOYyjvaoA9GXGnfi2h5CbCg',
  hash: '5f5772ccc760b1d1c5c5ef057eb8909b82eb68ac5de9b79c71f2fb24a47b01c2'
};
