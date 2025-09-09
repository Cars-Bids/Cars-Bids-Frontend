import { useState, useEffect } from "react";
import Sidebar from "@/components/Main/SidebarProfile";
import {
  useGetUserNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/features/api/endpoints/Profile";
import type { UpdateUserNotificationSettingDto } from "@/features/types/Profile";
import { ChangePasswordModal, EditBioModal } from "@/components/Main/Modal";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/features/api/endpoints/Profile";

interface OpenSections {
  mentionedInComments: boolean;
  repliedToInComments: boolean;
  mentionedInCommunities: boolean;
  repliesInCommunity: boolean;
  followNewAuction: boolean;
  gainFollower: boolean;
  oneHourBefore: boolean;
  newBidsWatch: boolean;
  newCommentsWatch: boolean;
  questionsAnswered: boolean;
  auctionResults: boolean;
  outbid: boolean;
  loseAuction: boolean;
  newCommentsSeller: boolean;
  newBidsSeller: boolean;
  newAuctionInFollowedModels: boolean;
  newAuctionInFollowedBrands: boolean;
}

interface NotificationSettings {
  mentionedInComments: { email: boolean; inSite: boolean };
  repliedToInComments: { email: boolean; inSite: boolean };
  mentionedInCommunities: { email: boolean; inSite: boolean };
  repliesInCommunity: { email: boolean; inSite: boolean };
  followNewAuction: { email: boolean; inSite: boolean };
  gainFollower: { email: boolean; inSite: boolean };
  oneHourBefore: { email: boolean; inSite: boolean };
  newBidsWatch: { email: boolean; inSite: boolean };
  newCommentsWatch: { email: boolean; inSite: boolean };
  questionsAnswered: { email: boolean; inSite: boolean };
  auctionResults: { email: boolean; inSite: boolean };
  outbid: { email: boolean; inSite: boolean };
  loseAuction: { email: boolean };
  newCommentsSeller: { email: boolean; inSite: boolean };
  newBidsSeller: { email: boolean; inSite: boolean };
  newAuctionInFollowedModels: { email: boolean; inSite: boolean };
  newAuctionInFollowedBrands: { email: boolean; inSite: boolean };
  dailyEmail: boolean;
  weeklyEmail: boolean;
  playSound: boolean;
}

type SectionKey = keyof OpenSections;
type NotifSection = Exclude<keyof NotificationSettings, "dailyEmail" | "weeklyEmail" | "playSound">;

interface ChevronProps {
  isOpen: boolean;
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export default function Settings() {

  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const { data: profile} = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [username, setUsername] = useState("Username");

  const { data: notificationSettingsFromBackend, isLoading } = useGetUserNotificationSettingsQuery();
  const [updateNotificationSettings] = useUpdateNotificationSettingsMutation();

  const [openSections, setOpenSections] = useState<OpenSections>({
    mentionedInComments: false,
    repliedToInComments: false,
    mentionedInCommunities: false,
    repliesInCommunity: false,
    followNewAuction: false,
    gainFollower: false,
    oneHourBefore: false,
    newBidsWatch: false,
    newCommentsWatch: false,
    questionsAnswered: false,
    auctionResults: false,
    outbid: false,
    loseAuction: false,
    newCommentsSeller: false,
    newBidsSeller: false,
    newAuctionInFollowedModels: false,
    newAuctionInFollowedBrands: false,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    mentionedInComments: { email: false, inSite: false },
    repliedToInComments: { email: false, inSite: false },
    mentionedInCommunities: { email: false, inSite: false },
    repliesInCommunity: { email: false, inSite: false },
    followNewAuction: { email: false, inSite: false },
    gainFollower: { email: false, inSite: false },
    oneHourBefore: { email: false, inSite: false },
    newBidsWatch: { email: false, inSite: false },
    newCommentsWatch: { email: false, inSite: false },
    questionsAnswered: { email: false, inSite: false },
    auctionResults: { email: false, inSite: false },
    outbid: { email: false, inSite: false },
    loseAuction: { email: false },
    newCommentsSeller: { email: false, inSite: false },
    newBidsSeller: { email: false, inSite: false },
    newAuctionInFollowedModels: { email: false, inSite: false },
    newAuctionInFollowedBrands: { email: false, inSite: false },
    dailyEmail: true,
    weeklyEmail: true,
    playSound: false,
  });

  const notificationKeyMap: Record<string, { key: string; id: number }> = {
    newAuctionInFollowedModels: { key: "NewAuctionInFollowedModels", id: 1 },
    repliedToInComments: { key: "RepliedInComments", id: 6 },
    mentionedInCommunities: { key: "MentionedInCommunities", id: 7 },
    repliesInCommunity: { key: "RepliedInCommunities", id: 8 },
    followNewAuction: { key: "NewAuctionInFollows", id: 9 },
    gainFollower: { key: "NewFollower", id: 10 },
    oneHourBefore: { key: "FollowedAuctionEndsSoon", id: 11 },
    newBidsWatch: { key: "NewBidOnFollowedAuction", id: 3 },
    newCommentsWatch: { key: "NewCommentOnFollowedAuction", id: 4 },
    questionsAnswered: { key: "NewAnswerOnFollowedAuction", id: 12 },
    auctionResults: { key: "AuctionResults", id: 13 },
    outbid: { key: "Outbid", id: 14 },
    loseAuction: { key: "LostAuction", id: 15 },
    newCommentsSeller: { key: "NewCommentOnAuction", id: 16 },
    newBidsSeller: { key: "NewBidOnAuction", id: 17 },
    mentionedInComments: { key: "MentionedInComments", id: 5 },
    newAuctionInFollowedBrands: { key: "NewAuctionInFollowedBrands", id: 2 },
  };

  const handleSaveUsername = async (newUsername: string) => {
    setUsernameModalOpen(false);
    try {
      await updateProfile({
        id: profile?.id ?? 0,
        username: newUsername,
        email: profile?.email ?? "",
        bio: profile?.bio ?? "",
        profilePicture: undefined,
      }).unwrap();
    } catch (error) {
      console.error("Не вдалося оновити username:", error);
    }
  };
  
  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile]);

  useEffect(() => {
    const dailyEmail = localStorage.getItem("dailyEmail");
    const weeklyEmail = localStorage.getItem("weeklyEmail");
    const playSound = localStorage.getItem("playSound");

    setNotificationSettings((prev) => ({
      ...prev,
      dailyEmail: dailyEmail === "true",
      weeklyEmail: weeklyEmail === "true",
      playSound: playSound === "true",
    }));
  }, []);
  useEffect(() => {
  if (!notificationSettingsFromBackend) return;

  const byId = notificationSettingsFromBackend.reduce((acc: Record<number, any>, s: any) => {
    acc[s.notificationTypeId] = s;
    return acc;
  }, {});

  setNotificationSettings((prev) => {
    const result: any = { ...prev };
    (Object.keys(notificationKeyMap) as NotifSection[]).forEach((frontKey) => {
      const id = notificationKeyMap[frontKey].id;
      const backend = byId[id];
      if (backend) {
        result[frontKey] = {
          email: Boolean(backend.sendEmail),
          inSite: frontKey === "loseAuction" ? false : Boolean(backend.sendInSite),
        };
      } else {
        result[frontKey] = prev[frontKey] ?? { email: false, inSite: false };
      }
    });
    return result as NotificationSettings;
  });
}, [notificationSettingsFromBackend]);



  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleNotification = async (section: NotifSection | "dailyEmail" | "weeklyEmail" | "playSound", type?: "email" | "inSite") => {
    const newSettings = {
      ...notificationSettings,
      [section]: type
        ? typeof notificationSettings[section] === "object" && notificationSettings[section] !== null
          ? {
            ...notificationSettings[section],
            [type]: !(notificationSettings[section] as { email: boolean; inSite: boolean })[type],
          }
          : notificationSettings[section]
        : !notificationSettings[section],
    };
    setNotificationSettings(newSettings);

    if (section === "dailyEmail" || section === "weeklyEmail" || section === "playSound") {
      localStorage.setItem(section, String(newSettings[section]));
      return;
    }

    const settingsToUpdate: UpdateUserNotificationSettingDto[] = Object.keys(notificationKeyMap)
      .map((key) => {
        const notifSection = key as NotifSection;
        return {
          notificationTypeId: notificationKeyMap[notifSection].id,
          notificationTypeKey: notificationKeyMap[notifSection].key,
          sendEmail: (newSettings[notifSection] as { email: boolean; inSite: boolean }).email,
          sendInSite: notifSection === "loseAuction" ? false : (newSettings[notifSection] as { email: boolean; inSite: boolean }).inSite,
        };
      })
      .filter((setting) => setting.notificationTypeKey);

    try {
      await updateNotificationSettings(settingsToUpdate).unwrap();
    } catch (error) {
      console.error("Не вдалося оновити налаштування сповіщень:", error);
      setNotificationSettings(notificationSettings);
    }
  };

  const ChevronIcon = ({ isOpen }: ChevronProps) => (
    <div className={`w-6 h-6 relative transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
      <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );

  const ToggleSwitch = ({ checked, onChange }: ToggleProps) => (
    <div
      className="w-6 h-6 relative cursor-pointer rounded outline-1 outline-[#d0d0d0]"
      onClick={onChange}
    >
      <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-transparent transition-all duration-200">
        {checked && (
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto py-8">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <div className="flex-1 max-w-[1072px]">
          <div className="w-full p-3 rounded-md inline-flex flex-col justify-center items-center gap-9 overflow-hidden">
            <div className="self-stretch flex flex-col justify-end items-start gap-5">
              <div className="justify-start text-white text-2xl font-bold">Settings</div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">Account</div>
              <div className="self-stretch h-[49px] inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-[140px]">
                  <div className="inline-flex flex-col justify-start items-start gap-1">
                    <div className="justify-start text-white text-base font-medium">Username</div>
                    <div className="justify-start text-white text-sm font-normal">{username}</div>
                  </div>
                  <div
                    data-show-icon="false"
                    className="px-4 py-2 bg-[#212121] rounded-md flex justify-center items-center gap-2.5 cursor-pointer"
                    onClick={() => setUsernameModalOpen(true)}
                  >
                    <div className="justify-start text-white text-sm font-normal">Change username</div>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-[140px]">
                  <div className="inline-flex flex-col justify-start items-start gap-1">
                    <div className="justify-start text-white text-base font-medium">Password</div>
                    <div className="justify-start text-white text-sm font-light">**********</div>
                  </div>
                  <div
                    data-show-icon="false"
                    className="px-4 py-2 bg-[#212121] rounded-md flex justify-center items-center gap-2.5 cursor-pointer"
                    onClick={() => setPasswordModalOpen(true)}
                  >
                    <div className="justify-start text-white text-sm font-normal">Change password</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">Payment info</div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="inline-flex flex-col justify-start items-start gap-2.5">
                  <div className="justify-start text-white text-base font-medium">Registered card</div>
                  <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="w-6 h-6 relative">
                      <div className="w-5 h-3.5 left-[2px] top-[5px] absolute outline-2 outline-offset-[-1px] outline-white" />
                      <div className="w-5 h-0 left-[2px] top-[10px] absolute outline-2 outline-offset-[-1px] outline-white" />
                    </div>
                    <div className="justify-start text-white text-sm font-normal">4441 **** **** 2173</div>
                  </div>
                </div>
                <div
                  data-show-icon="false"
                  className="px-4 py-2 bg-[#212121] rounded-md flex justify-center items-center gap-2.5 cursor-pointer"
                >
                  <div className="justify-start text-white text-sm font-normal">Update card</div>
                </div>
              </div>
              <div className="self-stretch h-0 outline-[0.50px] outline-offset-[-0.25px] outline-white"></div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="inline-flex flex-col justify-start items-start gap-2.5">
                  <div className="justify-start text-white text-base font-medium">Phone number</div>
                  <div className="justify-start text-white text-sm font-normal">+380681340912</div>
                </div>
                <div
                  data-show-icon="false"
                  className="px-4 py-2 bg-[#212121] rounded-md flex justify-center items-center gap-2.5 cursor-pointer"
                >
                  <div className="justify-start text-white text-sm font-normal">Change phone number</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">Color theme</div>
              <div className="self-stretch inline-flex justify-start items-center gap-[86px]">
                <div className="px-1 flex justify-start items-center gap-3 cursor-pointer">
                  <div className="px-0.5 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-[#d0d0d0] text-base font-normal">Light</div>
                  </div>
                  <div className="w-[66px] px-3 py-2 bg-white rounded outline-2 outline-offset-[-2px] flex justify-center items-center gap-2 flex-wrap content-center">
                    <div className="w-[17px] h-4 relative bg-[#d0d0d0] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#d0d0d0] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#d0d0d0] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#d0d0d0] rounded-sm" />
                  </div>
                </div>
                <div className="px-1 flex justify-start items-center gap-3 cursor-pointer">
                  <div className="px-0.5 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-[#d0d0d0] text-base font-normal">Dark</div>
                  </div>
                  <div className="w-[66px] px-3 py-2 bg-[#121212] rounded outline-2 outline-offset-[-2px] outline-[#cd1f22] flex justify-center items-center gap-2 flex-wrap content-center">
                    <div className="w-[17px] h-4 relative bg-[#212121] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#212121] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#212121] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#212121] rounded-sm" />
                  </div>
                </div>
                <div className="px-1 flex justify-start items-center gap-3 cursor-pointer">
                  <div className="px-0.5 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-[#d0d0d0] text-base font-normal">System based</div>
                  </div>
                  <div className="w-[66px] px-3 py-2 bg-gradient-to-l from-[#121212] to-white rounded outline-2 outline-offset-[-2px] flex justify-center items-center gap-2 flex-wrap content-center">
                    <div className="w-[17px] h-4 relative bg-[#d0d0d0] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#212121] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#d0d0d0] rounded-sm" />
                    <div className="w-[17px] h-4 relative bg-[#212121] rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">News Emails</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-white text-base font-medium">Send me the daily email</div>
                  <div className="rounded outline-1 outline-offset-[-1px] flex justify-center items-center gap-2.5 cursor-pointer">
                    <ToggleSwitch
                      checked={notificationSettings.dailyEmail}
                      onChange={() => toggleNotification("dailyEmail")}
                    />
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-white text-base font-medium">Send me week in review email</div>
                  <div className="rounded outline-1 outline-offset-[-1px] flex justify-center items-center gap-2.5 cursor-pointer">
                    <ToggleSwitch
                      checked={notificationSettings.weeklyEmail}
                      onChange={() => toggleNotification("weeklyEmail")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">General Notifications</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-white text-base font-medium">Play sound when bids are placed (desktop only)</div>
                  <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                    <ToggleSwitch
                      checked={notificationSettings.playSound}
                      onChange={() => toggleNotification("playSound")}
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("mentionedInComments")}
                  >
                    <div className="justify-start text-white text-base font-medium">When I'm mentioned in comments</div>
                    <ChevronIcon isOpen={openSections.mentionedInComments} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.mentionedInComments ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.mentionedInComments.email}
                            onChange={() => toggleNotification("mentionedInComments", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.mentionedInComments.inSite}
                            onChange={() => toggleNotification("mentionedInComments", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("repliedToInComments")}
                  >
                    <div className="justify-start text-white text-base font-medium">When I'm replied to in comments</div>
                    <ChevronIcon isOpen={openSections.repliedToInComments} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.repliedToInComments ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.repliedToInComments.email}
                            onChange={() => toggleNotification("repliedToInComments", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.repliedToInComments.inSite}
                            onChange={() => toggleNotification("repliedToInComments", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("mentionedInCommunities")}
                  >
                    <div className="justify-start text-white text-base font-medium">When I'm mentioned in communities</div>
                    <ChevronIcon isOpen={openSections.mentionedInCommunities} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.mentionedInCommunities ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.mentionedInCommunities.email}
                            onChange={() => toggleNotification("mentionedInCommunities", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.mentionedInCommunities.inSite}
                            onChange={() => toggleNotification("mentionedInCommunities", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("repliesInCommunity")}
                  >
                    <div className="justify-start text-white text-base font-medium">When someone replies to me in a community</div>
                    <ChevronIcon isOpen={openSections.repliesInCommunity} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.repliesInCommunity ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.repliesInCommunity.email}
                            onChange={() => toggleNotification("repliesInCommunity", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.repliesInCommunity.inSite}
                            onChange={() => toggleNotification("repliesInCommunity", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("followNewAuction")}
                  >
                    <div className="justify-start text-white text-base font-medium">When someone I follow has a new auction</div>
                    <ChevronIcon isOpen={openSections.followNewAuction} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.followNewAuction ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.followNewAuction.email}
                            onChange={() => toggleNotification("followNewAuction", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.followNewAuction.inSite}
                            onChange={() => toggleNotification("followNewAuction", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("gainFollower")}
                  >
                    <div className="justify-start text-white text-base font-medium">When I gain a new follower</div>
                    <ChevronIcon isOpen={openSections.gainFollower} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.gainFollower ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.gainFollower.email}
                            onChange={() => toggleNotification("gainFollower", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.gainFollower.inSite}
                            onChange={() => toggleNotification("gainFollower", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">Watch List Notifications</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("oneHourBefore")}
                  >
                    <div className="justify-start text-white text-base font-medium">1 hour before the auction ends</div>
                    <ChevronIcon isOpen={openSections.oneHourBefore} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.oneHourBefore ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.oneHourBefore.email}
                            onChange={() => toggleNotification("oneHourBefore", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.oneHourBefore.inSite}
                            onChange={() => toggleNotification("oneHourBefore", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("newBidsWatch")}
                  >
                    <div className="justify-start text-white text-base font-medium">When there are new bids</div>
                    <ChevronIcon isOpen={openSections.newBidsWatch} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.newBidsWatch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newBidsWatch.email}
                            onChange={() => toggleNotification("newBidsWatch", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newBidsWatch.inSite}
                            onChange={() => toggleNotification("newBidsWatch", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("newCommentsWatch")}
                  >
                    <div className="justify-start text-white text-base font-medium">When there are new comments</div>
                    <ChevronIcon isOpen={openSections.newCommentsWatch} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.newCommentsWatch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newCommentsWatch.email}
                            onChange={() => toggleNotification("newCommentsWatch", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newCommentsWatch.inSite}
                            onChange={() => toggleNotification("newCommentsWatch", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("questionsAnswered")}
                  >
                    <div className="justify-start text-white text-base font-medium">When questions are answered</div>
                    <ChevronIcon isOpen={openSections.questionsAnswered} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.questionsAnswered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.questionsAnswered.email}
                            onChange={() => toggleNotification("questionsAnswered", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.questionsAnswered.inSite}
                            onChange={() => toggleNotification("questionsAnswered", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("auctionResults")}
                  >
                    <div className="justify-start text-white text-base font-medium">When auction results are ready</div>
                    <ChevronIcon isOpen={openSections.auctionResults} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.auctionResults ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.auctionResults.email}
                            onChange={() => toggleNotification("auctionResults", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.auctionResults.inSite}
                            onChange={() => toggleNotification("auctionResults", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">Bidder Notifications</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("outbid")}
                  >
                    <div className="justify-start text-white text-base font-medium">When I am outbid</div>
                    <ChevronIcon isOpen={openSections.outbid} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.outbid ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.outbid.email}
                            onChange={() => toggleNotification("outbid", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.outbid.inSite}
                            onChange={() => toggleNotification("outbid", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("loseAuction")}
                  >
                    <div className="justify-start text-white text-base font-medium">When I lose an auction</div>
                    <ChevronIcon isOpen={openSections.loseAuction} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.loseAuction ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.loseAuction.email}
                            onChange={() => toggleNotification("loseAuction", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="justify-start text-white text-lg font-bold leading-tight">Seller Notifications</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("newCommentsSeller")}
                  >
                    <div className="justify-start text-white text-base font-medium">When there are new comments on my auction</div>
                    <ChevronIcon isOpen={openSections.newCommentsSeller} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.newCommentsSeller ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newCommentsSeller.email}
                            onChange={() => toggleNotification("newCommentsSeller", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newCommentsSeller.inSite}
                            onChange={() => toggleNotification("newCommentsSeller", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start transition-all duration-300 ease-in-out">
                  <div
                    className="self-stretch inline-flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection("newBidsSeller")}
                  >
                    <div className="justify-start text-white text-base font-medium">When there are new bids on my auction</div>
                    <ChevronIcon isOpen={openSections.newBidsSeller} />
                  </div>
                  <div
                    className={`self-stretch transition-all duration-300 ease-in-out overflow-hidden ${openSections.newBidsSeller ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="inline-flex justify-start items-start gap-5 px-2 py-1">
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newBidsSeller.email}
                            onChange={() => toggleNotification("newBidsSeller", "email")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">Email</div>
                      </div>
                      <div className="flex justify-start items-center gap-2.5">
                        <div className="bg-[#212121] rounded outline-1 outline-offset-[-1px] outline-[#d0d0d0] flex justify-center items-center gap-2.5 cursor-pointer">
                          <ToggleSwitch
                            checked={notificationSettings.newBidsSeller.inSite}
                            onChange={() => toggleNotification("newBidsSeller", "inSite")}
                          />
                        </div>
                        <div className="justify-start text-white text-base font-medium">In-Site</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-white"></div>
            <div
              data-show-icon="true"
              className="px-4 py-2 bg-[#212121] rounded-md inline-flex justify-center items-center gap-2.5 cursor-pointer"
            >
              <div className="justify-start text-white text-sm font-normal">Remove account</div>
              <div className="w-5 h-5 relative">
                <div className="w-[16.67px] h-[4.17px] left-[1.67px] top-[2.50px] absolute outline-2 outline-offset-[-1px] outline-[#cd1f22]" />
                <div className="w-[13.33px] h-[10.83px] left-[3.33px] top-[6.67px] absolute outline-2 outline-offset-[-1px] outline-[#cd1f22]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Модалка для зміни імені */}
      <EditBioModal
        isOpen={isUsernameModalOpen}
        onClose={() => setUsernameModalOpen(false)}
        initialValue={username}
        onSave={handleSaveUsername}
      />
      {/* Модалка для зміни паролю */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}