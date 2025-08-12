export interface LoginFormData {
    email: string
    password: string
    rememberMe: boolean
  }
  
  export interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void
    onForgotPassword: () => void
    isLoading?: boolean
  }
  
  export interface LoginPageProps {
    onLogin?: (data: LoginFormData) => Promise<void>
    onForgotPassword?: () => void
  }
  