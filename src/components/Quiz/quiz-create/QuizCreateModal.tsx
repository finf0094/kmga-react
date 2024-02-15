import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from "@components/Modal";
import UIForm from '@src/components/Base UI/UIForm';
import UIField from '@src/components/Base UI/UIField';

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
			title="Create Survey"
			subtitle='Enter the required fields to create a survey'
			width='600'
			button
			buttonText="Создать"
			buttonDisabled={!isValid}
			isOpen={isOpen}
			onClose={onClose}
			onConfirm={handleSubmit(onSubmit)}
		>
			<UIForm submitFn={handleSubmit(onSubmit)} isButton={false}>
				<UIField label='Name' id='quizName' inputProps={{...register('title', { required: 'Name is required!' }), placeholder: "Enter a survey name"}} error={errors.title?.message} />
				<UIField label='Description' id='quizDesc' inputProps={{...register('description', { required: 'Description is required!' }), placeholder: "Enter a survey description"}} error={errors.description?.message} />
				<UIField label='Tags' id='quizTags' inputProps={{placeholder: "Enter a tag name and press ENTER to add", onKeyDown: handleTagsKeyDown}} error={errors.description?.message} />

				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
					{tags.map((tag, index) => (
						<span key={index} className="tag" style={{ borderRadius: '50px', background: '#F5F7FA', paddingLeft: '12px' }}>
							{tag}
							<button type="button" onClick={() => removeTag(index)} style={{ marginLeft: '7px', padding: '4px 9px', borderRadius: '50%', fontSize: '16px', background: '#ef5a5a', color: 'white' }}>x</button>
						</span>
					))}
				</div>
			</UIForm>
		</Modal>
	);
};

export default CreateQuizModal;
