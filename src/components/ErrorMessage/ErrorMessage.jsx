import { FaImage } from 'react-icons/fa';
import { Text } from './ErrorMessage.styled'

export const ErrorMessage = ({ message }) => {
	return <Text><FaImage /> {message}</Text>
}