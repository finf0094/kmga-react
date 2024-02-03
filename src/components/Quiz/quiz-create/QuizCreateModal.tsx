import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from "@components/Modal";

interface CreateQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; description: string; tags: string[] }) => void;
}

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [tags, setTags] = useState<string[]>([]);
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isValid },
        watch,
    } = useForm<{ title: string; description: string; tags: string[] }>({
        defaultValues: {
            tags: [],
        },
    });

    const handleTagsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tagsValue = event.currentTarget.value.trim();

            if (tagsValue && !tags.includes(tagsValue)) {
                setTags([...tags, tagsValue]);
                setValue('tags', [...tags, tagsValue]);
                event.currentTarget.value = '';
            }
        }
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        setValue('tags', newTags);
    };


    // Watch the tags to update the local state when they change
    watch('tags');

    return (
        <Modal
            id="createQuizModal"
            title="Create Quiz"
            button
            buttonText="Create"
            buttonDisabled={!isValid}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleSubmit(onSubmit)}
        >

            <label htmlFor="title">Title:</label>
            <input id="title"{...register('title', { required: 'This field is required' })}/>
            {errors.title && <span>{errors.title.message}</span>}

            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                {...register('description', { required: 'This field is required' })}
            />
            {errors.description && <span>{errors.description.message}</span>}

            <label htmlFor="tags">Tags:</label>
            <input
                type="text"
                id="tags"
                onKeyDown={handleTagsKeyDown}
            />
            <div>
                {tags.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                        <button type="button" onClick={() => removeTag(index)}>×</button>
                    </span>
                ))}
            </div>
        </Modal>
    );
};

export default CreateQuizModal;
