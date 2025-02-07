import { useForm } from 'react-hook-form';
import { MailMessage } from '@interfaces';

import RichTextEditor, {
    BaseKit,
    TextAlign,
    Underline,
    Strike,
    Italic,
    Indent,
    Blockquote,
    Bold,
    BulletList,
    Color,
    Heading,
    Highlight,
    Link,
    FontFamily,
    FontSize,
    SlashCommand,
    TextDirection,
} from 'reactjs-tiptap-editor';
import { UIForm, UITitle } from '@components/Base UI';
import UIField from '../../../components/Base UI/UIField.tsx';
import { useCreateMailMessage, useMailMessageById, useUpdateMailMessage } from '@store/api';
import toast from 'react-hot-toast';

import 'katex/dist/katex.min.css';

import 'reactjs-tiptap-editor/style.css';
import { useEffect } from 'react';
import { Loader } from '@components';

const extensions = [
    BaseKit.configure({
        multiColumn: true,
        placeholder: {
            showOnlyCurrent: true,
        },
        characterCount: {
            limit: 50_000,
        },
    }),
    Color.configure({ spacer: true }),
    Heading.configure({ spacer: true }),
    TextDirection,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Underline,
    Strike,
    Italic,
    Indent,
    Blockquote,
    Bold,
    BulletList,
    Color,
    Heading,
    Highlight,
    Link,
    FontFamily,
    FontSize,
    SlashCommand,
];

interface MailMessageFormProps {
    quizId: string;
    mailMessageId?: string;
}

export const MailMessageForm = ({ quizId, mailMessageId }: MailMessageFormProps) => {
    const isEditMode = !!mailMessageId;
    const {
        data: existingMessage,
        isLoading,
    } = useMailMessageById({ mailMessageId: mailMessageId ?? '' }, { skip: !mailMessageId });
    const [createMutate] = useCreateMailMessage();
    const [updateMutate] = useUpdateMailMessage();

    const form = useForm<Omit<MailMessage, 'id'>>({
        defaultValues: {
            quizId,
            title: '',
            footer: '',
            btnText: '',
            content: '',
        },
    });

    useEffect(() => {
        if (existingMessage) {
            form.reset({
                ...existingMessage,
                quizId,
            });
        }
    }, [existingMessage, form, quizId]);

    const onSubmit = async (data: Omit<MailMessage, 'id'>) => {
        try {
            if (isEditMode && mailMessageId) {
                await updateMutate({ id: mailMessageId, ...data });
                toast.success('Mail message updated successfully');
            } else {
                await createMutate(data);
                toast.success('Mail message created successfully');
            }
        } catch (error: unknown) {
            toast.error(`Error during create or update mail message`);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <UITitle title="Mail message" subtitle="Create a mail message" />
            <UIForm submitFn={form.handleSubmit(onSubmit)} isButton={true} buttonText="Create">
                <UIField
                    label="Title"
                    id="title"
                    inputProps={{
                        ...form.register('title', { required: 'Title is required!' }),
                        placeholder: 'Enter a title',
                    }}
                    error={form.formState.errors.title?.message}
                />
                <RichTextEditor
                    label="Enter a content for mail message"
                    output="html"
                    content={existingMessage?.content || form.getValues('content')}
                    onChangeContent={(val) => form.setValue('content', val)}
                    extensions={extensions}
                />
                <UIField
                    label="Title"
                    id="title"
                    inputProps={{
                        ...form.register('btnText', { required: 'button text is required!' }),
                        placeholder: 'Enter a button text',
                    }}
                    error={form.formState.errors.title?.message}
                />
                <RichTextEditor
                    label="Enter a footer for mail message"
                    output="html"
                    content={existingMessage?.footer || form.getValues('footer') || ''}
                    onChangeContent={(val) => form.setValue('footer', val)}
                    extensions={extensions}
                />
            </UIForm>
        </div>
    );
};