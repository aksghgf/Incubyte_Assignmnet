import type { Sweet } from '../../../types/sweet.types';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import styles from './SweetCard.module.css';

interface SweetCardProps {
    sweet: Sweet;
    onPurchase?: (id: string) => void;
    onEdit?: (sweet: Sweet) => void;
    onDelete?: (id: string) => void;
    isAdmin?: boolean;
}

export function SweetCard({ sweet, onPurchase, onEdit, onDelete, isAdmin = false }: SweetCardProps) {
    const isOutOfStock = sweet.quantity === 0;

    return (
        <Card hoverable className={styles.sweetCard}>
            {sweet.imageUrl && (
                <div className={styles.imageContainer}>
                    <img src={sweet.imageUrl} alt={sweet.name} className={styles.image} />
                </div>
            )}

            <div className={styles.content}>
                <h3 className={styles.name}>{sweet.name}</h3>
                <p className={styles.category}>{sweet.category}</p>

                {sweet.description && (
                    <p className={styles.description}>{sweet.description}</p>
                )}

                <div className={styles.footer}>
                    <div className={styles.priceSection}>
                        <span className={styles.price}>₹{sweet.price.toFixed(2)}</span>
                        <span className={isOutOfStock ? styles.outOfStock : styles.stock}>
                            {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} available`}
                        </span>
                    </div>

                    <div className={styles.actions}>
                        {!isAdmin && onPurchase && (
                            <Button
                                size="small"
                                onClick={() => onPurchase(sweet.id)}
                                disabled={isOutOfStock}
                            >
                                Purchase
                            </Button>
                        )}

                        {isAdmin && (
                            <>
                                {onEdit && (
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        onClick={() => onEdit(sweet)}
                                    >
                                        Edit
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        size="small"
                                        variant="danger"
                                        onClick={() => onDelete(sweet.id)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
