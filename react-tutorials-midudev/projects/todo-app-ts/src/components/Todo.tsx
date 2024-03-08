import { type Todo as TodoType, type TodoId } from '../types'

interface Props extends TodoType {
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
    onRemovetodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onToggleCompleteTodo({
            id, completed: event.target.checked
        })
    }

    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={handleChangeCheckbox}
                // onChange={(event) => {
                //     onToggleCompleteTodo({ id, completed: event.target.checked })
                // }}
            />
            <label>{title}</label>
            <button
                className='destroy'
                onClick={() => {
                    onRemoveTodo({ id })
                }}
            />
        </div>
    )
}