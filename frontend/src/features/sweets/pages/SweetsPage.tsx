import { useSweets, usePurchaseSweet } from '../../../hooks/useSweets';
import { SweetsList } from '../components/SweetsList';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../utils/toast';
import { STORAGE_KEYS } from '../../../config/constants';
import styles from './SweetsPage.module.css';

export function SweetsPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const { data: sweets = [], isLoading } = useSweets();
    const purchaseMutation = usePurchaseSweet();

    const handlePurchase = async (sweetId: string) => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            await purchaseMutation.mutateAsync({
                id: sweetId,
                data: { quantity: 1 }
            });
            showToast('Purchase successful!', 'success');
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Purchase failed', 'error');
        }
    };

    return (
        <div className={styles.page}>
            <SweetsList
                sweets={sweets}
                isLoading={isLoading}
                onPurchase={handlePurchase}
                isAdmin={false}
            />
        </div>
    );
}
