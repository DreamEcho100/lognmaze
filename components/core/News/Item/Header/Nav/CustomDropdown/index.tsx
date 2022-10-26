import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FaEllipsisV } from 'react-icons/fa'

import { TNewsItemData } from '@coreLib/ts/global'
import { useUserSharedState } from '@store/UserContext'
import DropdownRoot from '@commonComponentsIndependent/Dropdown'
import DropdownTriggerMenu from '@commonComponentsIndependent/Dropdown/Trigger'
import DropdownList from '@commonComponentsIndependent/Dropdown/List'
import DropdownMenuItem from '@commonComponentsIndependent/Dropdown/Item'

const DynamicNewsItemActionTypeUpdate = dynamic(
  () => import('@coreComponents/News/Item/Action/Type/Update'),
  {
    ssr: false,
  },
)
const DynamicNewsItemActionTypeDelete = dynamic(
  () => import('@coreComponents/News/Item/Action/Type/Delete'),
  {
    ssr: false,
  },
)
const DynamicCustomShareModelComponent = dynamic(
  () => import('@commonComponentsIndependent/CustomShareModel'),
  {
    ssr: false,
  },
)

interface IProps {
  newsItemData: TNewsItemData
}
const CustomDropdown = ({ newsItemData }: IProps) => {
  const [
    {
      data: { user: userData, token: userToken },
    },
  ] = useUserSharedState()

  const [
    isNewsItemTypeUpdateActionModalVisible,
    setIsNewsItemTypeUpdateActionModalVisible,
  ] = useState(false)
  const [
    isNewsItemTypeDeleteActionModalVisible,
    setIsNewsItemTypeDeleteActionModalVisible,
  ] = useState(false)

  const [
    isCustomShareModelComponentVisible,
    setIsCustomShareModelComponentVisible,
  ] = useState(false)
  const [isDropdownListVisible, setIsDropdownListVisible] = useState(false)

  const newsItemTypeUpdateActionModalVisibilityHandler = (
    isNewsItemTypeUpdateActionModalVisible?: boolean,
  ) => {
    setIsNewsItemTypeUpdateActionModalVisible((prevState) => {
      const state =
        typeof isNewsItemTypeUpdateActionModalVisible !== 'boolean'
          ? !prevState
          : isNewsItemTypeUpdateActionModalVisible

      if (!state) {
        document.body.style.overflowX = 'hidden'
        document.body.style.overflowY = 'auto'
      }

      return state
    })
  }
  const newsItemTypeDeleteActionModalVisibilityHandler = (
    isNewsItemTypeDeleteActionModalVisible?: boolean,
  ) => {
    setIsNewsItemTypeDeleteActionModalVisible((prevState) => {
      const state =
        typeof isNewsItemTypeDeleteActionModalVisible !== 'boolean'
          ? !prevState
          : isNewsItemTypeDeleteActionModalVisible

      if (!state) {
        document.body.style.overflowX = 'hidden'
        document.body.style.overflowY = 'auto'
      }

      return state
    })
  }
  const customShareModelComponentVisibilityHandler = (
    isCustomShareModelComponentVisible?: boolean,
  ) =>
    setIsCustomShareModelComponentVisible((prevState) =>
      typeof isCustomShareModelComponentVisible !== 'boolean'
        ? !prevState
        : isCustomShareModelComponentVisible,
    )

  return (
    <>
      <DropdownRoot
        setIsDropdownListVisible={setIsDropdownListVisible}
        isDropdownListVisible={isDropdownListVisible}
      >
        <DropdownTriggerMenu
          title="News item setting button"
          setIsDropdownListVisible={setIsDropdownListVisible}
        >
          <FaEllipsisV />
        </DropdownTriggerMenu>

        <DropdownList isDropdownListVisible={isDropdownListVisible}>
          {userData?.id && (
            <>
              <DropdownMenuItem
                setIsDropdownListVisible={setIsDropdownListVisible}
              >
                <button
                  onClick={() =>
                    newsItemTypeUpdateActionModalVisibilityHandler(true)
                  }
                >
                  Update
                </button>
              </DropdownMenuItem>
              <hr />
              <DropdownMenuItem
                setIsDropdownListVisible={setIsDropdownListVisible}
              >
                <button
                  onClick={() =>
                    newsItemTypeDeleteActionModalVisibilityHandler(true)
                  }
                >
                  Delete
                </button>
              </DropdownMenuItem>
              <hr />
            </>
          )}
          <DropdownMenuItem setIsDropdownListVisible={setIsDropdownListVisible}>
            <button
              onClick={() => customShareModelComponentVisibilityHandler()}
            >
              Share
            </button>
          </DropdownMenuItem>
        </DropdownList>
      </DropdownRoot>

      {userData?.id && (
        <>
          {isNewsItemTypeUpdateActionModalVisible && (
            <DynamicNewsItemActionTypeUpdate
              newsItemData={newsItemData}
              userToken={userToken}
              modalVisibilityHandler={
                newsItemTypeUpdateActionModalVisibilityHandler
              }
              isModalVisible={isNewsItemTypeUpdateActionModalVisible}
            />
          )}
          {isNewsItemTypeDeleteActionModalVisible && (
            <DynamicNewsItemActionTypeDelete
              newsItemData={newsItemData}
              userToken={userToken}
              modalVisibilityHandler={
                newsItemTypeDeleteActionModalVisibilityHandler
              }
              isModalVisible={isNewsItemTypeDeleteActionModalVisible}
            />
          )}
        </>
      )}
      {/* {isCustomShareModelComponentVisible && ( */}
      <DynamicCustomShareModelComponent
        isModalVisible={isCustomShareModelComponentVisible}
        modalVisibilityHandler={customShareModelComponentVisibilityHandler}
        platforms="all"
        itemData={newsItemData}
      />
      {/* )} */}
    </>
  )
}

export default CustomDropdown
