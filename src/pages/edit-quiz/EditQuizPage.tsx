import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import UIForm from '@src/components/Base UI/UIForm';
import UIField from '@src/components/Base UI/UIField';
import { useGetQuizByIdQuery, useUpdateQuizMutation } from '@store/api';
import { QuizStatus } from '@interfaces';
import { UITitle } from '@src/components/Base UI';

interface EditQuizForm {
    title: string;
    description: string;
    status: QuizStatus;
    tags: string[];
}

const EditQuizPage: React.FC = () => {
    const { quizId } = useParams<{ id: string }>() as {quizId: string};
    const { data: quiz, error, isLoading } = useGetQuizByIdQuery(quizId);
    const [updateQuiz] = useUpdateQuizMutation();
    const [tags, setTags] = useState<string[]>([]);
    const { handleSubmit, register, setValue, formState: { errors }, watch } = useForm<EditQuizForm>();

    useEffect(() => {
        if (quiz) {
            setValue('title', quiz.title);
            setValue('description', quiz.description);
            setValue('status', quiz.status as QuizStatus);
            setTags(quiz.tags);
        }
    }, [quiz, setValue]);

    const onSubmit = async (data: EditQuizForm) => {
        await updateQuiz({ ...data, id: quizId });
    };

    const removeTag = (indexToRemove: number) => {
		const newTags = tags.filter((_, index) => index !== indexToRemove);
		setTags(newTags);
		setValue('tags', newTags);
	};
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
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('status', event.target.value as QuizStatus);
    };

	// Watch the tags to update the local state when they change
	watch('tags');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading quiz</div>;

    return (
        <div>
            <UITitle title='EditQuiz' subtitle='Edit Quiz' />
            <UIForm submitFn={handleSubmit(onSubmit)} isButton={true} buttonText='Обновить'>
                <UIField label='Title' id='quizTitle' inputProps={{ ...register('title', { required: 'This field is required!' }) }} error={errors.title?.message} />
                <UIField label='Description' id='quizDescription' inputProps={{ ...register('description', { required: 'This field is required!' }) }} error={errors.description?.message} />
                <div>
                    <label htmlFor="quizStatus">Status</label>
                    <select id="quizStatus" className="select-custom" {...register('status', { required: 'This field is required!' })} onChange={handleStatusChange}>
                        <option value={QuizStatus.ACTIVE}>Активный</option>
                        <option value={QuizStatus.INACTIVE}>Неактивный</option>
                        <option value={QuizStatus.DRAFT}>Черновик</option>
                    </select>
                </div>
                <UIField label='Тэги' id='quizTags' inputProps={{placeholder: "Введите название тэга и нажмите ENTER для добавления", onKeyDown: handleTagsKeyDown}} error={errors.description?.message} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
					{tags.map((tag, index) => (
						<span key={index} className="tag" style={{ borderRadius: '50px', background: '#F5F7FA', paddingLeft: '12px' }}>
							{tag}
							<button type="button" onClick={() => removeTag(index)} style={{ marginLeft: '7px', padding: '4px 9px', borderRadius: '50%', fontSize: '16px', background: '#ef5a5a', color: 'white' }}>x</button>
						</span>
					))}
				</div>
            </UIForm>
        </div>
    );
};

export default EditQuizPage;