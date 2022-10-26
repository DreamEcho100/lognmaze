import { FC, FormEvent, Fragment, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'

import classes from './index.module.css'

import { useUserSharedState } from '@store/UserContext'
import ButtonComponent from '@commonComponentsIndependent/Button'
import ModalComponent from '@commonComponentsIndependent/Modal'
import FormComponent from '@commonComponentsIndependent/Form'
import FormControlComponent from '@commonComponentsIndependent/FormControl'
import LabelComponent from '@commonComponentsIndependent/Label'
import TextareaComponent from '@commonComponentsIndependent/Textarea'
import {
  handleUpdateUserData,
  handleUpdateUserDataRequestResetAction,
} from '@store/UserContext/actions'

const AfterFormSubmitMessage = ({
  fieldsCheck,
}: {
  fieldsCheck?: string[]
}) => {
  if (!fieldsCheck || fieldsCheck.length === 0) return null

  return (
    <ul>
      {fieldsCheck.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

interface IProps {
  originalBio: string
}

const EditBioButton: FC<IProps> = ({ originalBio }) => {
  const [values, setValues] = useState({
    bio: originalBio || '',
  })
  const [
    {
      data: { user, token },
      actions: { requests: userRequests },
    },
    userDispatch,
  ] = useUserSharedState()

  const [isBioEditModalVisible, setIsBioEditModalVisible] = useState(false)

  const [disableButtons, setDisableButtons] = useState(false)
  const [fieldsCheck, setFieldsCheck] = useState<string[]>([])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!values.bio) return

    const fieldsCheck = []
    setFieldsCheck((prevState) => (prevState.length !== 0 ? [] : prevState))
    setDisableButtons(true)

    if (values.bio === originalBio) fieldsCheck.push('Nothing Changed!')
    else if (values.bio.trim().replace(/\s{2,}/g, '').length < 25)
      fieldsCheck.push('Bio is less than 25 characters.')

    if (!user) return

    if (fieldsCheck.length === 0) {
      await handleUpdateUserData({
        dispatch: userDispatch,
        userData: user,
        values: {
          bio: values.bio,
        },
        token: token,
      })
    }

    if (fieldsCheck.length > 0) {
      setFieldsCheck(fieldsCheck)
    }

    setDisableButtons(false)
  }

  useEffect(() => {
    if (userRequests.updateData.success) {
      setIsBioEditModalVisible(false)
      handleUpdateUserDataRequestResetAction(userDispatch)
      return
    }

    if (userRequests.updateData.errorMessage) {
      console.error(userRequests.updateData.errorMessage)
      setFieldsCheck([userRequests.updateData.errorMessage])
    }
  }, [
    fieldsCheck,
    userDispatch,
    userRequests.updateData.errorMessage,
    userRequests.updateData.success,
  ])

  return (
    <>
      <ButtonComponent
        title="Edit Bio"
        onClick={() => setIsBioEditModalVisible(true)}
        className="d-flex flex-xy-center"
      >
        <FaEdit />
      </ButtonComponent>

      <ModalComponent
        isModalVisible={isBioEditModalVisible}
        modalVisibilityHandler={() => setIsBioEditModalVisible((prev) => !prev)}
        modalClasses={{
          container: {
            new: classes.modelContainer,
          },
        }}
      >
        <Fragment key="header">
          <h2 className="heading-2">Edit Bio</h2>
        </Fragment>
        <Fragment key="body">
          <FormComponent onSubmit={handleSubmit}>
            <LabelComponent htmlFor="bio">Bio</LabelComponent>
            <FormControlComponent>
              <TextareaComponent
                name="bio"
                id="bio"
                setValues={setValues}
                value={values.bio}
                minLength={25}
                maxLength={150}
                // pattern='.{25, 150}'
              />
            </FormControlComponent>

            <AfterFormSubmitMessage fieldsCheck={fieldsCheck} />

            <FormControlComponent>
              <ButtonComponent
                title="Submit Form"
                disabled={disableButtons}
                type="submit"
              >
                Submit
              </ButtonComponent>
            </FormControlComponent>
          </FormComponent>
        </Fragment>
      </ModalComponent>
    </>
  )
}

export default EditBioButton
