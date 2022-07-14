import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { AppTheme } from './theme/AppTheme';

export const JournalApp = () => {
  return (
    <Provider store={ store }>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </Provider>
  )
}
