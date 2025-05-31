import { Card } from './ui/Card/Card';
import { MemberCard } from './ui/MemberCard/MemberCard';

type TComponents = {
	Card: typeof Card;
	MemberCard: typeof MemberCard;
};

const Space: TComponents = {
	Card,
	MemberCard,
};

export { Space };

export * from './model/space';

export { useGetUserSpaces } from './api/useGetUserSpaces';
export { useGetCurrentSpaceInfo } from './api/useGetCurrentSpaceInfo';
