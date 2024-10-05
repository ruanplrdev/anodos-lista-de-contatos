// components/withAuth.tsx
import { useEffect, ComponentType, JSX } from 'react';
import { useRouter } from 'next/router';

interface WithAuthProps {
    // Outras props que o componente pode receber, caso necessário
}

const withAuth =(WrappedComponent: React.ReactNode)=> {
    const AuthComponent = ((props: JSX.IntrinsicAttributes) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token'); // Ou use Cookies se preferir

            if (!token) {
                // Redirecionar para a página de login se não estiver autenticado
                router.replace('/login');
            }
        }, [router]);

        // Se o token existe, renderiza o componente protegido
        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
