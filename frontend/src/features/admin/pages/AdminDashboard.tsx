import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useSweets,
    useCreateSweet,
    useUpdateSweet,
    useDeleteSweet
} from '../../../hooks/useSweets';
import { SweetsList } from '../../sweets/components/SweetsList';
import { SweetForm } from '../components/SweetForm';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import type { Sweet } from '../../../types/sweet.types';
import { showToast } from '../../../utils/toast';
import styles from './AdminDashboard.module.css';

export function AdminDashboard() {
    const navigate = useNavigate();
    const { data: sweets = [], isLoading } = useSweets();
    const createMutation = useCreateSweet();
    const updateMutation = useUpdateSweet();
    const deleteMutation = useDeleteSweet();

    const [showForm, setShowForm] = useState(false);
    const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleCreate = async (data: any) => {
        try {
            // Remove imageUrl if it's empty to avoid validation error
            const cleanData = { ...data };
            if (!cleanData.imageUrl || cleanData.imageUrl.trim() === '') {
                delete cleanData.imageUrl;
            }

            await createMutation.mutateAsync(cleanData);
            setShowForm(false);
            showToast('Sweet created successfully!', 'success');
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to create sweet', 'error');
        }
    };

    const handleUpdate = async (data: any) => {
        if (!editingSweet) return;

        try {
            // Remove imageUrl if it's empty to avoid validation error
            const cleanData = { ...data };
            if (!cleanData.imageUrl || cleanData.imageUrl.trim() === '') {
                delete cleanData.imageUrl;
            }

            await updateMutation.mutateAsync({ id: editingSweet.id, data: cleanData });
            setEditingSweet(null);
            showToast('Sweet updated successfully!', 'success');
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to update sweet', 'error');
        }
    };

    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            await deleteMutation.mutateAsync(deleteId);
            showToast('Sweet deleted successfully!', 'success');
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to delete sweet', 'error');
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    const handleEdit = (sweet: Sweet) => {
        setEditingSweet(sweet);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingSweet(null);
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button className={styles.backBtn} onClick={() => navigate('/')}>
                        ← Back
                    </button>
                    <div>
                        <h1 className={styles.title}>Admin Dashboard</h1>
                        <p className={styles.subtitle}>Manage your sweet inventory</p>
                    </div>
                </div>

                <Button onClick={() => setShowForm(true)}>
                    + Add New Sweet
                </Button>
            </div>

            {showForm && (
                <Card className={styles.formCard}>
                    <SweetForm
                        sweet={editingSweet || undefined}
                        onSubmit={editingSweet ? handleUpdate : handleCreate}
                        onCancel={handleCloseForm}
                    />
                </Card>
            )}

            <div className={styles.stats}>
                <Card>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Total Sweets</span>
                        <span className={styles.statValue}>{sweets.length}</span>
                    </div>
                </Card>
                <Card>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>In Stock</span>
                        <span className={styles.statValue}>
                            {sweets.filter(s => s.quantity > 0).length}
                        </span>
                    </div>
                </Card>
                <Card>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Out of Stock</span>
                        <span className={styles.statValue}>
                            {sweets.filter(s => s.quantity === 0).length}
                        </span>
                    </div>
                </Card>
            </div>

            <SweetsList
                sweets={sweets}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={true}
            />

            <ConfirmDialog
                isOpen={showConfirm}
                title="Delete Sweet"
                message="Are you sure you want to delete this sweet? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
}
