import React, { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaLocationArrow } from "react-icons/fa6";

import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import { useSubscribeContent } from '@/hooks/finance.hook';
const ContactPage: React.FC = () => {
    const dataBanner = {
        title: "Liên hệ",
        content: "Mong muốn được đồng hành và đóng góp một phần nhỏ, mình xin gửi vài chia sẻ chân thành về website và hoạt động hiện tại, hy vọng sẽ hữu ích trên hành trình lan tỏa yêu thương.",
        buttonText: "Góp ý",
    };
    const { mutate: subscribe, isPending: isSubscribing } = useSubscribeContent();
    const [form, setForm] = useState({
        email: '',
        consent: true,
    });
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email) {
            // minimal validation, hook will handle server-side
            return;
        }
        subscribe({
            email: form.email,
            consent: form.consent,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    return (
        <div className='w-full flex flex-col items-center overflow-hidden scrool-smooth'>
            <BannerCustomComponent
                title={dataBanner.title}
                content={dataBanner.content}
                buttonText={dataBanner.buttonText}
            />
            <div className='max-w-7xl px-4 py-6 flex flex-col items-start w-full'>
                <BreadcrumbRibbon label="Liên hệ" className="mb-4" />
            </div>
            <section className='w-full max-w-7xl gap-8 grid grid-cols-1 sm:grid-cols-2 py-4 sm:py-8 px-4 sm:px-8 bg-white'>
                <div className="flex flex-col justify-between">
                    <div className="flex justify-start mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                            Liên hệ
                        </h2>
                    </div>
                    <p className='my-4 text-gray-400 font-body'>Kết nối với chúng tôi mở ra cánh cửa đến những cơ hội mới. Cho dù bạn có thắc mắc, ý tưởng hay muốn hợp tác, chúng tôi luôn sẵn sàng lắng nghe.</p>
                    <div className='mt-6 p-6 flex flex-col justify-between'>
                        <div className='flex space-x-4 items-center mb-6 font-medium font-body'>
                            <IoIosMail size={24} className='text-[#89CFF0]' />
                            <p>ChuyenXeBacAi@gmail.com</p>
                        </div>
                        <div className='flex space-x-4 items-center mb-6 font-medium font-body'>
                            <FaPhoneAlt size={20} className='text-[#89CFF0]' />
                            <p>+123 456 789</p>
                        </div>
                        <div className='flex space-x-4 items-center mb-6 font-medium font-body'>
                            <FaLocationDot size={24} className='text-[#89CFF0]' />
                            <p>123 Street 456 House</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="w-full max-w-md bg-[#F9FAFB] rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-8"
                    >

                        {/* Input Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={(e) => e.currentTarget.parentElement?.classList.add("active")}
                                onBlur={(e) => !e.target.value && e.currentTarget.parentElement?.classList.remove("active")}
                                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-400 outline-none py-2 text-gray-700 text-sm transition-all duration-300 peer"
                            />
                            <label
                                className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none
                                    ${form.email
                                        ? "top-[-6px] text-xs text-yellow-500"
                                        : "top-2 text-gray-400"} 
                                    peer-focus:top-[-6px] peer-focus:text-xs peer-focus:text-yellow-500`}
                            >
                                Your email
                            </label>
                        </div>
                        {/* Button */}
                        <button
                            onClick={handleSubscribe}
                            disabled={isSubscribing}
                            className="mt-2 flex items-center justify-center gap-2 bg-[#FEC84B] hover:bg-[#FBBF24] text-white font-medium rounded-lg py-3 transition-all duration-300"
                        >
                            <FaLocationArrow />
                            Send Message
                        </button>
                    </form>
                </div>

            </section>

        </div>
    );
};

export default ContactPage;