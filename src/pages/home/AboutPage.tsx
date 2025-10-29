import React from 'react';
import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import imageAboutUs from '@/assets/images/Home/image_aboutus.png'
const AboutPage: React.FC = () => {
    const dataBanner = {
        title: "Giới thiệu",
        content: "Mong muốn được đồng hành và đóng góp một phần nhỏ, mình xin gửi vài chia sẻ chân thành về website và hoạt động hiện tại, hy vọng sẽ hữu ích trên hành trình lan tỏa yêu thương.",
        buttonText: "Xem giới thiệu về chúng tôi",
    };
    return (
        <div className='w-full flex flex-col items-center overflow-hidden scrool-smooth'>
            <BannerCustomComponent
                title={dataBanner.title}
                content={dataBanner.content}
                buttonText={dataBanner.buttonText}
            />
            <div className='max-w-7xl px-4 py-6 flex flex-col items-start w-full'>
                <BreadcrumbRibbon label="Giới thiệu" className="mb-4" />
            </div>
            <section className='w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white'>
                <div className="max-w-7xl w-full">
                    <h2 className='font-bold text-[#355C7D] text-2xl'>Về Chuyến xe bác ái</h2>
                    <p className='my-4 text-gray-400 font-body'>Hành trình vận chuyển yêu thương đến các điểm trường học ở vùng sâu vùng xa, hy vọng tiếp năng lượng để các em học sinh vững bước đến trường. Bằng tình yêu thương, vùng đất khô cằn sẽ nảy lên những mầm non tươi xanh, và những cuộc sống mới trở nên bừng sáng và đầy hy vọng giữa muôn vàn khắc nghiệt.</p>
                    <p className='my-4 text-gray-400 font-body'>Thương rủ rê mọi người “sống giàu có” cùng Chuyến Xe Bác Ái. 💛💛💛</p>
                    <img src={imageAboutUs} alt="Về Chuyến xe bác ái" className='w-full border rounded-lg shadow-lg'/>
                </div>
            </section>
            <section className='w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white'>
                <div className="max-w-7xl w-full">
                    <div className='w-full border-b-2 border-[#355C7D]'>
                        <h2 className='font-bold text-[#355C7D] text-2xl'>Giới thiệu chung</h2>
                    </div>
                    <p className='my-4 text-gray-400 font-body'>Hành trình vận chuyển yêu thương đến các điểm trường học ở vùng sâu vùng xa, hy vọng tiếp năng lượng để các em học sinh vững bước đến trường. Bằng tình yêu thương, vùng đất khô cằn sẽ nảy lên những mầm non tươi xanh, và những cuộc sống mới trở nên bừng sáng và đầy hy vọng giữa muôn vàn khắc nghiệt.</p>
                    <p className='my-4 text-gray-400 font-body'>Thương rủ rê mọi người “sống giàu có” cùng Chuyến Xe Bác Ái. 💛💛💛</p>
                </div>
            </section>
            <section className='w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white'>
                <div className="max-w-7xl w-full">
                    <div className='w-full border-b-2 border-[#355C7D]'>
                        <h2 className='font-bold text-[#355C7D] text-2xl'>Tầm nhìn sứ mệnh</h2>
                    </div>
                    <p className='my-4 text-gray-400 font-body'>Hành trình vận chuyển yêu thương đến các điểm trường học ở vùng sâu vùng xa, hy vọng tiếp năng lượng để các em học sinh vững bước đến trường. Bằng tình yêu thương, vùng đất khô cằn sẽ nảy lên những mầm non tươi xanh, và những cuộc sống mới trở nên bừng sáng và đầy hy vọng giữa muôn vàn khắc nghiệt.</p>
                    <p className='my-4 text-gray-400 font-body'>Thương rủ rê mọi người “sống giàu có” cùng Chuyến Xe Bác Ái. 💛💛💛</p>
                </div>
            </section>
            <section className='w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white'>
                <div className="max-w-7xl w-full">
                    <div className='w-full border-b-2 border-[#355C7D]'>
                        <h2 className='font-bold text-[#355C7D] text-2xl'>Thư ngỏ</h2>
                    </div>
                    <p className='my-4 text-gray-400 font-body'>Hành trình vận chuyển yêu thương đến các điểm trường học ở vùng sâu vùng xa, hy vọng tiếp năng lượng để các em học sinh vững bước đến trường. Bằng tình yêu thương, vùng đất khô cằn sẽ nảy lên những mầm non tươi xanh, và những cuộc sống mới trở nên bừng sáng và đầy hy vọng giữa muôn vàn khắc nghiệt.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;