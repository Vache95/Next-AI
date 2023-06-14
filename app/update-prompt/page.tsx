'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { PostType } from '@@types/createPrompt';
import Form from '@components/Form';

const EditPrompt: React.FC = (): JSX.Element => {
	const router = useRouter();
	const [submitting, setSubmititing] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const promptId: string | null = searchParams.get('id');
	const [post, setPost] = useState<PostType>({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};
		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e: FormEvent) => {
		e.preventDefault();
		setSubmititing(true);

		if (!promptId) return alert('Prompt ID not found');

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmititing(false);
		}
	};
	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
