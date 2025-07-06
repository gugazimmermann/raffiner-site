# Componentes UI Padronizados

Este diretório contém componentes reutilizáveis para estados de loading e error em toda a aplicação.

## Componentes Disponíveis

### LoadingSpinner

Spinner de carregamento animado com diferentes tamanhos e cores.

```jsx
import { LoadingSpinner } from '../components/ui';

<LoadingSpinner size='md' color='blue' text='Carregando dados...' />;
```

**Props:**

- `size`: 'sm' | 'md' | 'lg' | 'xl' (padrão: 'md')
- `color`: 'blue' | 'gray' | 'white' | 'red' | 'green' (padrão: 'blue')
- `text`: string (padrão: 'Carregando...')
- `className`: string

### LoadingSkeleton

Skeleton loading com diferentes tipos e configurações.

```jsx
import { LoadingSkeleton } from '../components/ui';

<LoadingSkeleton
  type='grid'
  count={3}
  showImage={true}
  showTitle={true}
  showDescription={true}
  showButtons={true}
/>;
```

**Props:**

- `type`: 'card' | 'text' | 'grid' (padrão: 'card')
- `count`: number (padrão: 1)
- `height`: string (padrão: 'h-48')
- `showImage`: boolean (padrão: true)
- `showTitle`: boolean (padrão: true)
- `showDescription`: boolean (padrão: true)
- `showButtons`: boolean (padrão: false)
- `className`: string

### ErrorMessage

Componente para exibir mensagens de erro com diferentes variantes.

```jsx
import { ErrorMessage } from '../components/ui';

<ErrorMessage
  error='Erro ao carregar dados'
  title='Erro de carregamento'
  showRetry={true}
  onRetry={handleRetry}
  variant='card'
/>;
```

**Props:**

- `error`: string (obrigatório)
- `title`: string (padrão: 'Erro ao carregar')
- `showIcon`: boolean (padrão: true)
- `showRetry`: boolean (padrão: false)
- `onRetry`: function
- `variant`: 'default' | 'inline' | 'card' (padrão: 'default')
- `className`: string

### LoadingState

Componente wrapper que gerencia automaticamente os estados de loading e error.

```jsx
import { LoadingState } from '../components/ui';

<LoadingState
  loading={loading}
  error={error}
  skeletonType='grid'
  skeletonCount={3}
  errorTitle='Erro ao carregar dados'
  showRetry={true}
  onRetry={handleRetry}
>
  {/* Conteúdo quando não há loading nem error */}
</LoadingState>;
```

**Props:**

- `loading`: boolean (obrigatório)
- `error`: string
- `children`: ReactNode
- `skeletonType`: 'card' | 'text' | 'grid' (padrão: 'card')
- `skeletonCount`: number (padrão: 3)
- `skeletonProps`: object
- `errorTitle`: string (padrão: 'Erro ao carregar')
- `showRetry`: boolean (padrão: true)
- `onRetry`: function
- `className`: string
- `fallback`: ReactNode

## Hook useAsyncState

Hook personalizado para gerenciar estados assíncronos de forma padronizada.

```jsx
import useAsyncState from '../hooks/useAsyncState';

const MyComponent = () => {
  const { data, loading, error, execute, reset } = useAsyncState([]);

  const fetchData = async () => {
    const result = await api.getData();
    return result;
  };

  useEffect(() => {
    execute(fetchData);
  }, [execute]);

  return (
    <LoadingState loading={loading} error={error}>
      {/* Renderizar data */}
    </LoadingState>
  );
};
```

## Migração

Para migrar componentes existentes:

1. Substitua os estados de loading e error manuais pelo `LoadingState`
2. Use `LoadingSkeleton` para skeletons personalizados
3. Use `ErrorMessage` para mensagens de erro consistentes
4. Considere usar `useAsyncState` para novos hooks

## Exemplos de Uso

### Componente Simples

```jsx
function MyComponent() {
  const { data, loading, error } = useMyData();

  return (
    <LoadingState loading={loading} error={error}>
      <div>{/* Seu conteúdo aqui */}</div>
    </LoadingState>
  );
}
```

### Componente com Skeleton Personalizado

```jsx
function MyComponent() {
  const { data, loading, error } = useMyData();

  return (
    <LoadingState
      loading={loading}
      error={error}
      skeletonType='grid'
      skeletonCount={6}
      skeletonProps={{
        showImage: false,
        showButtons: true,
      }}
    >
      <div>{/* Seu conteúdo aqui */}</div>
    </LoadingState>
  );
}
```

### Componente com Fallback

```jsx
function MyComponent() {
  const { data, loading, error } = useMyData();

  return (
    <LoadingState loading={loading} error={error} fallback={<EmptyState />}>
      <div>{/* Seu conteúdo aqui */}</div>
    </LoadingState>
  );
}
```
