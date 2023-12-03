import MainButton from "./MainButton"
import RemainingTime from "./RemainingTime";
import UsedTraffic from "./UsedTraffic";
import UserFullName from "./UserFullName";
import SupportInfo from "./SupportInfo";
import ShareLinks from "./ShareLinks";
import { Text } from "../../../designSystem/Text";
import useAPI from "../../../hooks/useAPI";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Modal } from "../../../designSystem/Modal";
import AppModal from "./AppModal";
import { getWindowData } from "../../../utils/getWindowData";

const MainBody = () => {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false)
  const { t } = useTranslation();

  const getInfo = useAPI(
    'me/',
    'GET',
    { reactQueryOptions: { enabled: true } }
  );

  const { deepLink } = getWindowData()


  return (
      <div className="md:grid md:grid-cols-2 md:gap-5 w-full h-full">
        <div className="w-full h-full flex flex-col gap-5 relative">
          <div className='w-full h-full bg-[#E0E4F5] rounded-b-[24px] md:rounded-[24px] bg-opacity-50 relative'>
            <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-7">
              <UserFullName fullName={getInfo.data?.profile_title ? getInfo.data?.profile_title : ''} />
              <div className="px-14 md:px-8 lg:px-16 w-full flex items-center justify-between">
                <UsedTraffic 
                  current={getInfo.data?.profile_usage_current ? getInfo.data?.profile_usage_current : ''} 
                  total={getInfo.data?.profile_usage_total ? getInfo.data?.profile_usage_total : ''} 
                />
                <RemainingTime 
                  remainingDays={getInfo.data?.profile_remaining_days ? getInfo.data?.profile_remaining_days : ''} 
                  resetIn={getInfo.data?.profile_reset_days ? getInfo.data?.profile_reset_days : ''}  
                />
              </div>
            </div>
          </div>
          <div className='w-full h-full bg-[#E0E4F5] rounded-t-[24px] md:rounded-[24px] bg-opacity-50 relative'>
            <div className="p-4 h-full bg-transparent flex items-center justify-center">
              <SupportInfo viewMoreUrl={getInfo.data?.admin_message_url ? getInfo.data?.admin_message_url : ''} />
            </div>
          </div>
          <MainButton 
            onClick={() => setIsAppModalOpen(true)} 
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
          />
          <Modal isModalOpen={isAppModalOpen} closeModal={() => setIsAppModalOpen(false)} title={t("Configure your VPN")}>
            <AppModal profileUrl={getInfo.data?.profile_url ? getInfo.data?.profile_url : ''} />
          </Modal>
        </div>
        <div className="w-full md:flex md:flex-col md:gap-5 hidden bg-[#E0E4F5] rounded-[24px] p-10 bg-opacity-50">
          <Text fontSize='lg' fontWeight='medium' className='text-[#212529]'>
              {t('Share Link')}
          </Text>
          <ShareLinks />
        </div>
        {isAppModalOpen && deepLink ? <iframe className="hidden" src={deepLink} width="0" height="0"></iframe> : null}
      </div>
  )
}

export default MainBody