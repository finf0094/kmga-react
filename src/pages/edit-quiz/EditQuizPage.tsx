import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorResponse, useNavigate, useParams } from 'react-router-dom';
import UIForm from '@src/components/Base UI/UIForm';
import UIField from '@src/components/Base UI/UIField';
import { useGetQuizByIdQuery, useUpdateQuizMutation } from '@store/api';
import { QuizStatus } from '@interfaces';
import { UITitle } from '@src/components/Base UI';
import toast from 'react-hot-toast';
import { Loader } from '@src/components';

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
    const navigate = useNavigate();

    useEffect(() => {
        if (quiz) {
            setValue('title', quiz.title);
            setValue('description', quiz.description);
            setValue('status', quiz.status as QuizStatus);
            setTags(quiz.tags);
        }
    }, [quiz, setValue]);

    const onSubmit = async (data: EditQuizForm) => {
        try {
            await updateQuiz({ ...data, id: quizId });
            toast.success(`Тест был успешно обновлён!`);
            navigate('/dashboard');
            window.location.reload();
            
        } catch (err) {
            const error = err as ErrorResponse;
            if (error.status === 403) {
                toast.error('Не хватает прав для обновления вопроса!');
            }
            console.error(err);
        }
        
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

    if (isLoading) return <Loader />;
    if (error) return <div className='loader'>Ошибка при загрузке страницы теста</div>;

    return (
        <div className='edit-quiz page'>
            <div className="back" onClick={() => navigate(-1)}>Назад</div>
            <UITitle title='Тест' subtitle='Редактирование теста' />
            <UIForm submitFn={handleSubmit(onSubmit)} isButton={true} buttonText='Обновить'>
                <UIField label='Название' id='quizTitle' inputProps={{ ...register('title', { required: 'This field is required!' }) }} error={errors.title?.message} />
                <UIField label='Описание' id='quizDescription' inputProps={{ ...register('description', { required: 'This field is required!' }) }} error={errors.description?.message} />
                <UIField label='Тэги' id='quizTags' inputProps={{placeholder: "Введите название тэга и нажмите ENTER для добавления", onKeyDown: handleTagsKeyDown}} error={errors.description?.message} />
                <div className='ui-field'>
                    <label htmlFor="quizStatus" className='ui-field__label'>Статус</label>
                    <select id="quizStatus" className="select-custom" {...register('status', { required: 'This field is required!' })} onChange={handleStatusChange}>
                        <option value={QuizStatus.ACTIVE}>Активный</option>
                        <option value={QuizStatus.INACTIVE}>Неактивный</option>
                        <option value={QuizStatus.DRAFT}>Черновик</option>
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
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