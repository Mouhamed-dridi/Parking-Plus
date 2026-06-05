import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';

import { 
  AppstoreOutline, CarOutline, CarryOutOutline, ShoppingCartOutline, 
  DeploymentUnitOutline, ThunderboltOutline, IdcardOutline, EnvironmentOutline, 
  InboxOutline, CalendarOutline, ToolOutline, FileTextOutline, SettingOutline,
  EyeOutline, EyeInvisibleOutline, LoadingOutline,
  TeamOutline, ShopOutline, UnorderedListOutline, DeleteOutline,
  GlobalOutline, PhoneOutline, MailOutline, DollarOutline,
  FieldTimeOutline, SafetyOutline, AuditOutline, FileProtectOutline,
  UploadOutline, WarningOutline, PlusOutline, UserOutline,
  HighlightOutline, CheckCircleOutline, CloseCircleOutline,
  ArrowUpOutline, ArrowDownOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  AppstoreOutline, CarOutline, CarryOutOutline, ShoppingCartOutline, 
  DeploymentUnitOutline, ThunderboltOutline, IdcardOutline, EnvironmentOutline, 
  InboxOutline, CalendarOutline, ToolOutline, FileTextOutline, SettingOutline,
  EyeOutline, EyeInvisibleOutline, LoadingOutline,
  TeamOutline, ShopOutline, UnorderedListOutline, DeleteOutline,
  GlobalOutline, PhoneOutline, MailOutline, DollarOutline,
  FieldTimeOutline, SafetyOutline, AuditOutline, FileProtectOutline,
  UploadOutline, WarningOutline, PlusOutline, UserOutline,
  HighlightOutline, CheckCircleOutline, CloseCircleOutline,
  ArrowUpOutline, ArrowDownOutline
];

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideNzI18n(en_US), 
    importProvidersFrom(FormsModule), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    provideNzIcons(icons)
  ]
};
