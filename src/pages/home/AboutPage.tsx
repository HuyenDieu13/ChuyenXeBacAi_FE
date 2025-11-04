import React from "react";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";
import imageAboutUs from "@/assets/images/Home/image_aboutus.png";

const AboutPage: React.FC = () => {
  const dataBanner = {
    title: "Giới thiệu",
    content:
      "Cùng nhau mang yêu thương lan tỏa đến mọi miền Tổ quốc – nơi mỗi hành trình là một câu chuyện của sẻ chia, hy vọng và tình người.",
    buttonText: "Xem giới thiệu về chúng tôi",
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden scroll-smooth">
      {/* Banner */}
      <BannerCustomComponent
        title={dataBanner.title}
        content={dataBanner.content}
        buttonText={dataBanner.buttonText}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl px-4 py-6 flex flex-col items-start w-full">
        <BreadcrumbRibbon label="Giới thiệu" className="mb-4" />
      </div>

      {/* === Phần 1: Về Chuyến Xe Bác Ái === */}
      <section className="w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl w-full">
          <h2 className="font-bold text-[#355C7D] text-2xl">
            Về Chuyến Xe Bác Ái
          </h2>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            <strong>Chuyến Xe Bác Ái</strong> là một hành trình thiện nguyện được
            hình thành từ tình yêu thương và tinh thần sẻ chia của những con
            người giản dị. Từ những ngày đầu chỉ là vài người bạn đồng hành trên
            chiếc xe nhỏ, nay chúng tôi đã có thêm nhiều người bạn đồng lòng
            góp sức để cùng nhau mang hơi ấm, nụ cười và niềm tin đến với các em
            nhỏ vùng sâu vùng xa.
          </p>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            Mỗi chuyến đi không chỉ là những món quà vật chất, mà còn là những
            cái ôm, ánh mắt và lời động viên gửi đến các em học sinh, những mảnh
            đời khó khăn, những cụ già neo đơn, những vùng đất còn nhiều thiếu
            thốn. Chính từ những hành trình đó, chúng tôi nhận lại vô vàn yêu
            thương và niềm tin vào sự tử tế.
          </p>
          <p className="my-4 text-gray-600 font-body italic">
            “Mỗi người góp một chút – cả cộng đồng cùng tạo nên phép màu.” 💛
          </p>
          <img
            src={imageAboutUs}
            alt="Về Chuyến Xe Bác Ái"
            className="w-full border rounded-lg shadow-lg mt-4"
          />
        </div>
      </section>

      {/* === Phần 2: Giới thiệu chung === */}
      <section className="w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl w-full">
          <div className="w-full border-b-2 border-[#355C7D]">
            <h2 className="font-bold text-[#355C7D] text-2xl">
              Giới thiệu chung
            </h2>
          </div>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            <strong>Website Chuyến Xe Bác Ái</strong> được xây dựng nhằm kết nối
            các cá nhân, nhóm thiện nguyện và cộng đồng cùng chung tay lan tỏa
            yêu thương. Nơi đây không chỉ chia sẻ những hành trình đã đi qua,
            mà còn là cầu nối để mọi người dễ dàng tham gia, đóng góp và theo
            dõi các hoạt động thiện nguyện một cách minh bạch, rõ ràng.
          </p>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            Trang web đóng vai trò như một nhật ký số — ghi lại những kỷ niệm,
            hình ảnh, câu chuyện và cảm xúc từ mỗi chuyến đi. Chúng tôi tin rằng
            khi yêu thương được lan tỏa, cuộc sống sẽ trở nên ấm áp và tốt đẹp
            hơn từng ngày.
          </p>
        </div>
      </section>

      {/* === Phần 3: Tầm nhìn & Sứ mệnh === */}
      <section className="w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl w-full">
          <div className="w-full border-b-2 border-[#355C7D]">
            <h2 className="font-bold text-[#355C7D] text-2xl">
              Tầm nhìn & Sứ mệnh
            </h2>
          </div>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            <strong>Tầm nhìn:</strong> Trở thành một cộng đồng thiện nguyện tự
            nguyện, minh bạch và lan tỏa — nơi bất kỳ ai cũng có thể tham gia,
            đóng góp và tạo nên giá trị tích cực cho xã hội.
          </p>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            <strong>Sứ mệnh:</strong> Kết nối những tấm lòng nhân ái để mang đến
            cơ hội học tập, điều kiện sống tốt hơn và niềm tin vào tương lai cho
            trẻ em khó khăn, đồng thời lan tỏa tinh thần “cho đi là còn mãi” đến
            với mọi người trong xã hội.
          </p>
          <p className="my-4 text-gray-600 font-body italic">
            “Không ai quá nhỏ để tạo nên điều lớn lao.” 🌱
          </p>
        </div>
      </section>

      {/* === Phần 4: Thư ngỏ === */}
      <section className="w-full flex justify-center py-4 sm:py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl w-full">
          <div className="w-full border-b-2 border-[#355C7D]">
            <h2 className="font-bold text-[#355C7D] text-2xl">Thư ngỏ</h2>
          </div>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            Gửi đến bạn – những người đã, đang và sẽ đồng hành cùng{" "}
            <strong>Chuyến Xe Bác Ái</strong> một lời cảm ơn chân thành nhất.
            Nhờ có sự ủng hộ, tin tưởng và góp sức của mọi người, hành trình
            của chúng tôi mới có thể tiếp tục lăn bánh qua từng nẻo đường xa xôi,
            đến được với những nơi cần sự giúp đỡ.
          </p>
          <p className="my-4 text-gray-600 font-body leading-relaxed">
            Mỗi đóng góp, dù là nhỏ nhất, đều là một ngọn đèn soi sáng con đường
            của những người đang cần hy vọng. Chúng tôi tin rằng, khi cùng nhau,
            chúng ta có thể biến những điều tưởng chừng nhỏ bé thành sức mạnh
            lan tỏa yêu thương lớn lao.
          </p>
          <p className="my-4 text-gray-600 font-body italic">
            Trân trọng và biết ơn,  
            <br />
            <strong>Đội ngũ Chuyến Xe Bác Ái 💙</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
