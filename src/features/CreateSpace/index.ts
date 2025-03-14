import { CreateModal } from './ui/CreateModal/CreateModal';

type TCreateSpaceComponents = {
	CreateModal: typeof CreateModal;
};

const CreateSpace: TCreateSpaceComponents = {
	CreateModal,
};

export { CreateSpace };
