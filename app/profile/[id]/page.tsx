'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Profile from '@components/Profile';

type UserProfileProps = {
	id: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ id = '' }): JSX.Element => {
	const searchParams = useSearchParams();
	const userName: string | null = searchParams.get('name');

	const [userPosts, setUserPosts] = useState<[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/$id}/posts`);
			const data = await response.json();

			setUserPosts(data);
		};

		if (id) fetchPosts();
	}, [id]);

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
			data={userPosts}
		/>
	);
};

export default UserProfile;
