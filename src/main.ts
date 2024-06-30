import { AppModule } from './app/bootstrap/app.module'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import './polyfills'

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    if (window['ngRef']) {
      window['ngRef'].destroy()
    }
    window['ngRef'] = ref
  })
  .catch((err) => console.error(err))
