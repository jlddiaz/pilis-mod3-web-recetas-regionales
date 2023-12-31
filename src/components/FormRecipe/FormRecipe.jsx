import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './FormRecipe.css'
import { createRecipe, updateRecipe } from '../../services/recipe.service'

const FormRecipe = ({ recipe, isUpdate }) => {
  const {
    id,
    name,
    description,
    image,
    ingredients,
    preparation,
    preparation_time,
  } = recipe
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [errores, setErrores] = useState([])

  const onSubmit = async (data) => {
    if (!isUpdate) {
      const response = await createRecipe(data)
      if (response.ok) {
        navigate('/')
      } else {
        const arrayErr = await response.json()
        setErrores(arrayErr.errors)
      }
    } else {
      const response = await updateRecipe(id, data)
      if (response.ok) {
        navigate('/')
      } else {
        const arrayErr = await response.json()
        setErrores(arrayErr.errors)
      }
    }
  }

  const handleCancel = () => {
    navigate('/')
  }
  return (
    <div className="form-recipe-container">
      <form className="form-recipe" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title-recipe">
          {isUpdate ? 'Actualizar Receta' : 'Nueva Receta'}
        </h1>
        <div className="input-group-recipe">
          <div className="input-container-recipe">
            <input
              className="input"
              type="text"
              placeholder="name"
              defaultValue={name}
              {...register('name', {
                required: ' ',
              })}
            />
            <label htmlFor="" className="label">
              Nombre
            </label>
          </div>
          <div className="input-container-recipe">
            <input
              className="input"
              type="text"
              placeholder="preparation_time"
              defaultValue={preparation_time}
              {...register('preparation_time')}
            />
            <label htmlFor="" className="label">
              Tiempo de Preparación
            </label>
          </div>

          <div className="input-container-recipe">
            <input
              className="input"
              type="text"
              placeholder="image"
              defaultValue={image}
              {...register('image', {
                required: ' ',
              })}
            />
            <label htmlFor="" className="label">
              Imagen
            </label>
          </div>
        </div>
        <div className="input-group-recipe">
          <div className="container-textarea">
            <textarea
              className="input textarea"
              type="text"
              placeholder="description"
              defaultValue={description}
              {...register('description', {
                required: ' ',
              })}
            />
            <label htmlFor="" className="label">
              Descripción
            </label>
          </div>
          <div className="container-textarea">
            <textarea
              className="input textarea"
              type="text"
              placeholder="ingredients"
              defaultValue={ingredients}
              {...register('ingredients', {
                required: ' ',
              })}
            />
            <label htmlFor="" className="label">
              Ingredientes
            </label>
          </div>
          <div className="container-textarea">
            <textarea
              className="input textarea"
              type="text"
              placeholder="preparation"
              defaultValue={preparation}
              {...register('preparation')}
            />
            <label htmlFor="" className="label">
              Preparación
            </label>
          </div>
        </div>
        <div className="btn-container-recipe">
          <button className="btn-form btn-cancel-form-recipe " onClick={handleCancel}>
            Cancelar
          </button>
          <button className="btn-form btn-submit-recipe" type="submit">
            {isUpdate ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormRecipe
