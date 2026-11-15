/**
 * NOVA Research - Mock Data Tập Trung
 * Dữ liệu phục vụ hiển thị động cho landing page tư vấn NCKH sinh viên
 */

export const STATS = [
  { value: '85%', label: 'Đề tài xuất phát từ việc quan sát thực tế đời sống sinh viên' },
  { value: '42+', label: 'Dự án sinh viên đạt giải NCKH cấp Trường, Bộ & Euréka' },
  { value: '12.800+', label: 'Lượt sinh viên được tập huấn phương pháp & viết đề cương' },
  { value: '1:1', label: 'Mô hình đồng hành kèm cặp cá nhân hóa cùng Giảng viên' }
];

export const TOPIC_CATEGORIES = [
  { id: 'all', label: 'Tất cả đề tài' },
  { id: 'ai-tech', label: 'Trí tuệ Nhân tạo & CNTT' },
  { id: 'engineering', label: 'Kỹ thuật & IoT' },
  { id: 'economics', label: 'Kinh tế & Khởi nghiệp' },
  { id: 'green', label: 'Môi trường & Bền vững' }
];

export const RESEARCH_TOPICS = [
  {
    id: 'ai-medical-vision',
    title: 'Ứng dụng Học Sâu (Deep Learning) Hỗ Trợ Chẩn Đoán Sớm Tổn Thương Phổi Qua Ảnh X-Quang',
    field: 'ai-tech',
    category: ['ai-tech'],
    fieldName: 'Trí tuệ Nhân tạo & CNTT',
    level: 'Đề tài Cấp Bộ / Euréka',
    methodology: 'Thực nghiệm Mô hình Convolutional Neural Network (CNN) & Transfer Learning',
    mentor: 'TS. Trần Anh Tuấn (ĐHBK)',
    summary: 'Xây dựng mô hình thị giác máy tính nhận diện vùng viêm phổi và u nhỏ từ tập dữ liệu công khai NIH Chest X-ray, đạt độ chính xác > 94%.',
    gap: 'Các bác sĩ tuyến cơ sở thường đối mặt với khối lượng lớn ảnh chụp trong khi thiếu công cụ hỗ trợ sàng lọc sơ bộ tự động.',
    objectives: [
      'Tiền xử lý và làm sạch bộ dữ liệu ảnh X-quang chuẩn y tế (DICOM/PNG)',
      'Huấn luyện và tinh chỉnh các kiến trúc ResNet, EfficientNet và Vision Transformer',
      'Đánh giá hiệu năng bằng các chỉ số Sensitivity, Specificity và AUC-ROC',
      'Đóng gói API web nhẹ cho bác sĩ thử nghiệm tải ảnh và hiển thị Heatmap Grad-CAM'
    ],
    timeline: 'Thời gian hoàn thành dự kiến: 5 - 6 tháng'
  },
  {
    id: 'iot-smart-campus-air',
    title: 'Hệ Thống Quan Trắc Chất Lượng Không Khí Phòng Học Tự Động Qua Mạng Cảm Biến Không Dây LoRa',
    field: 'engineering',
    category: ['engineering'],
    fieldName: 'Kỹ thuật & IoT',
    level: 'Đề tài Cấp Trường',
    methodology: 'Thiết kế Mạch nhúng Vi điều khiển ESP32 + Cảm biến Bụi mịn PM2.5 & Khí CO2',
    mentor: 'KS. Lê Hoàng Minh (R&D Lab)',
    summary: 'Thu thập thông số môi trường lớp học theo thời gian thực, tự động bật quạt đối lưu và cảnh báo nồng độ CO2 vượt ngưỡng an toàn.',
    gap: 'Nồng độ CO2 trong các phòng học đóng kín máy lạnh thường tăng cao gây buồn ngủ và giảm khả năng tập trung của sinh viên.',
    objectives: [
      'Lựa chọn và hiệu chuẩn cảm biến quang học PMS5003 và cảm biến NDIR CO2',
      'Lập trình giao thức truyền thông tầm xa LoRaWAN tiết kiệm năng lượng',
      'Xây dựng máy chủ nhận dữ liệu và bảng hiển thị Dashboard (Grafana / Web)',
      'Thử nghiệm thực tế tại 5 giảng đường trường đại học trong 30 ngày'
    ],
    timeline: 'Thời gian hoàn thành dự kiến: 4 tháng'
  },
  {
    id: 'econ-tiktok-genz',
    title: 'Tác Động Của Tính Năng Live-commerce (TikTok Shop) Đến Hành Vi Mua Sắm Bốc Đồng Của Gen Z',
    field: 'economics',
    category: ['economics'],
    fieldName: 'Kinh tế & Khởi nghiệp',
    level: 'Giải thưởng Euréka',
    methodology: 'Nghiên cứu Định lượng: Khảo sát Bảng hỏi (Survey) & Mô hình PLS-SEM',
    mentor: 'ThS. Nguyễn Thị Mai Hương',
    summary: 'Kiểm định mối quan hệ giữa yếu tố áp lực khan hiếm (Flash sale), sức hút của KOC và cảm xúc hưng phấn dẫn đến quyết định mua hàng tức thì.',
    gap: 'Hầu hết các nghiên cứu trước đây chỉ khảo sát thương mại điện tử truyền thống (Shopee/Lazada), thiếu bối cảnh video tương tác trực tiếp.',
    objectives: [
      'Xây dựng khung thang đo lý thuyết dựa trên mô hình S-O-R (Stimulus - Organism - Response)',
      'Khảo sát ngẫu nhiên 500 sinh viên tại các trường đại học ở Đà Nẵng và Hà Nội',
      'Phân tích độ tin cậy Cronbach Alpha, kiểm định EFA/CFA và đường dẫn cấu trúc PLS-SEM',
      'Đề xuất khuyến nghị tiêu dùng tài chính thông minh cho người trẻ'
    ],
    timeline: 'Thời gian hoàn thành dự kiến: 4 - 5 tháng'
  },
  {
    id: 'green-bio-plastic',
    title: 'Nghiên Cứu Quy Trình Chế Tạo Màng Bọc Thực Phẩm Phân Hủy Sinh Học Từ Vỏ Tôm Và Tinh Bột Sắn',
    field: 'green',
    category: ['green'],
    fieldName: 'Môi trường & Bền vững',
    level: 'Đề tài Cấp Bộ',
    methodology: 'Hóa học Thực nghiệm: Chiết xuất Chitosan, Phối trộn Polymer sinh học & Đo cơ lý tính',
    mentor: 'TS. Hoàng Đăng Khoa',
    summary: 'Tận dụng phụ phẩm vỏ tôm để tạo màng bao gói có khả năng kháng khuẩn tự nhiên, tự phân hủy hoàn toàn trong đất sau 60 ngày.',
    gap: 'Rác thải nhựa dùng một lần từ ngành thực phẩm đang gây áp lực nghiêm trọng, trong khi vỏ tôm phế thải thủy sản chưa được tận thu hiệu quả.',
    objectives: [
      'Tối ưu hóa quy trình khử khoáng và khử protein để thu hồi Chitosan tinh khiết',
      'Tạo màng phối trộn với glycerol và tinh bột sắn theo các tỷ lệ khác nhau',
      'Đo độ bền kéo đứt, độ thấm khí O2 và khả năng kháng khuẩn đối với E. Coli',
      'Thử nghiệm bảo quản rau quả tươi kéo dài hạn dùng thêm 7 ngày'
    ],
    timeline: 'Thời gian hoàn thành dự kiến: 6 tháng'
  },
  {
    id: 'ai-vietnamese-law-nlp',
    title: 'Xây Dựng Trợ Lý Ảo Tra Cứu Văn Bản Luật Doanh Nghiệp Cho Khởi Nghiệp Trẻ Bằng RAG & LLM',
    field: 'ai-tech',
    category: ['ai-tech'],
    fieldName: 'Trí tuệ Nhân tạo & CNTT',
    level: 'Đề tài Cấp Trường',
    methodology: 'Kỹ thuật Retrieval-Augmented Generation (RAG) + Vector Database FAISS',
    mentor: 'TS. Trần Anh Tuấn (ĐHBK)',
    summary: 'Hệ thống hỏi đáp pháp lý tự động giúp các startup sinh viên tra cứu quy định thành lập công ty, thuế và hợp đồng một cách chính xác kèm số hiệu điều luật.',
    gap: 'Các mô hình ngôn ngữ lớn như ChatGPT thường bị ảo giác (hallucination) khi trả lời các điều luật cụ thể tại Việt Nam.',
    objectives: [
      'Thu thập và phân đoạn ngữ nghĩa toàn bộ văn bản Luật Doanh nghiệp & Luật Thuế',
      'Nhúng văn bản (Embedding) và đánh chỉ mục bằng Vector Database',
      'Thiết kế pipeline truy xuất và kiểm tra tính xác thực nguồn trích dẫn',
      'Đánh giá độ chính xác qua 100 tình huống pháp lý thực tế của sinh viên'
    ],
    timeline: 'Thời gian hoàn thành dự kiến: 5 tháng'
  },
  {
    id: 'iot-robot-arm-sorting',
    title: 'Mô Hình Cánh Tay Robot 4 Bậc Tự Do Phân Loại Rác Tái Chế Tự Động Bằng Thị Giác Máy Tính Nhúng',
    field: 'engineering',
    category: ['engineering'],
    fieldName: 'Kỹ thuật & IoT',
    level: 'Đề tài Cấp Trường',
    methodology: 'Hệ thống Cơ điện tử + Máy tính nhúng Raspberry Pi 5 & Thuật toán YOLOv8-Nano',
    mentor: 'KS. Lê Hoàng Minh (R&D Lab)',
    summary: 'Thiết kế cánh tay cơ khí gắp và phân loại rác thải nhựa, kim loại, giấy trên băng chuyền tự động với tốc độ 20 sản phẩm/phút.',
    gap: 'Phân loại rác tại nguồn ở Việt Nam hiện vẫn dựa vào thủ công hoặc các thùng rác thông thường với tỷ lệ sai lệch cao.',
    objectives: [
      'Thiết kế 3D và in mô hình cánh tay robot 4 bậc bằng nhựa PETG chịu lực',
      'Thu thập tập ảnh dữ liệu 3.000 mẫu rác thải thực tế và huấn luyện YOLOv8n',
      'Tích hợp camera góc rộng và tính toán động học nghịch (Inverse Kinematics)',
      'Đo lường độ ổn định và thời gian phản hồi liên tục trong 8 giờ vận hành'
    ],
    timeline: 'Thời gian hoàn thành dự kiến: 5 tháng'
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: 'Giai đoạn 01',
    title: 'Xác định Vấn đề & Đặt câu hỏi',
    description: 'Tìm khoảng trống nghiên cứu (Research Gap). Xác định mục tiêu nghiên cứu cụ thể, phạm vi đề tài và kiểm tra tính khả thi trước hội đồng xét duyệt.',
    output: 'Sản phẩm: Bản Thuyết minh đề cương NCKH'
  },
  {
    step: 'Giai đoạn 02',
    title: 'Tổng quan Tài liệu & Phương pháp',
    description: 'Đọc và phân loại tối thiểu 20-30 bài báo chuyên ngành. Lựa chọn phương pháp nghiên cứu phù hợp: định lượng (khảo sát), định tính hay thực nghiệm kỹ thuật.',
    output: 'Sản phẩm: Khung lý thuyết & Bảng hỏi khảo sát'
  },
  {
    step: 'Giai đoạn 03',
    title: 'Thu thập & Phân tích Dữ liệu',
    description: 'Tiến hành khảo sát thực địa hoặc chạy mô hình thực nghiệm (Python, R, SPSS, mô phỏng). Làm sạch dữ liệu và diễn giải kết quả thu được.',
    output: 'Sản phẩm: Bộ dữ liệu sạch & Biểu đồ phân tích'
  },
  {
    step: 'Giai đoạn 04',
    title: 'Viết Báo cáo & Báo cáo Nghiệm thu',
    description: 'Hoàn thiện báo cáo toàn văn theo quy chuẩn, định dạng trích dẫn tài liệu tham khảo và chuẩn bị slide thuyết trình bảo vệ trước hội đồng khoa học.',
    output: 'Sản phẩm: Báo cáo toàn văn & Bài báo khoa học'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Nguyễn Khánh Linh',
    achievement: 'Giải Nhất NCKH Cấp Trường 2024',
    topic: 'Ứng dụng AI Chẩn đoán Y tế',
    quote: 'Ban đầu nhóm mình rất loay hoay trong việc tìm kiếm tập dữ liệu và viết tổng quan tài liệu. Nhờ Mentor của NOVA hướng dẫn cách đọc bài báo Scopus và cấu trúc đề cương, nhóm đã tự tin bảo vệ xuất sắc trước hội đồng!'
  },
  {
    name: 'Trần Quang Huy',
    achievement: 'Giải Nhì Sinh viên NCKH Euréka',
    topic: 'Mô hình LoRaWAN Quan trắc Môi trường',
    quote: 'Thực nghiệm mạch nhúng gặp rất nhiều lỗi về nguồn và suy hao tín hiệu. Các buổi cố vấn 1:1 cùng các anh kỹ sư lab đã giúp mình gỡ rối từng dòng code và phương pháp đo kiểm để kịp nộp hồ sơ dự thi.'
  },
  {
    name: 'Phạm Thảo Vy',
    achievement: 'Bài báo công bố Hội nghị Quốc tế IEEE',
    topic: 'Thị giác máy tính & Robot tự hành',
    quote: 'Từ một ý tưởng bài tập lớn môn học, NOVA đã định hướng để nhóm phát triển thành đề tài NCKH bài bản. Đây chính là điểm sáng lớn nhất trong hồ sơ xin học bổng Thạc sĩ của mình.'
  }
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Sinh viên năm nhất hoặc năm hai, chưa học sâu chuyên ngành thì có làm NCKH được không?',
    answer: 'Hoàn toàn được và rất được khuyến khích! NCKH ở bậc đại học chú trọng vào việc rèn luyện tư duy đặt vấn đề và phương pháp làm việc khoa học. Sinh viên năm 1-2 có thể bắt đầu với vai trò thành viên thu thập số liệu, khảo sát thực tế hoặc làm các đề tài mang tính khám phá đời sống sinh viên dưới sự bảo trợ của một Mentor có kinh nghiệm.'
  },
  {
    id: 'faq-2',
    question: 'Làm NCKH có tốn kém kinh phí không và trường có hỗ trợ không?',
    answer: 'Đa số các đề tài được Hội đồng Khoa học cấp Khoa/Trường thông qua đều được cấp kinh phí nghiên cứu (tùy trường, thường dao động từ 3.000.000đ đến 15.000.000đ/đề tài). Ngoài ra, các đề tài xuất sắc gửi dự thi Euréka hoặc cấp Bộ sẽ nhận thêm hỗ trợ từ các quỹ khoa học và doanh nghiệp tài trợ.'
  },
  {
    id: 'faq-3',
    question: 'Lợi ích cụ thể khi đạt giải hoặc hoàn thành đề tài NCKH là gì?',
    answer: 'Bạn nhận được rất nhiều quyền lợi thiết thực: được cộng tối đa điểm rèn luyện, xét học bổng khuyến khích; nhiều trường cho phép miễn làm Khóa luận tốt nghiệp (tương đương 10 điểm luận văn); và có hồ sơ nổi bật khi ứng tuyển học bổng du học Thạc sĩ/Tiến sĩ hoặc các tập đoàn công nghệ lớn.'
  },
  {
    id: 'faq-4',
    question: 'Một nhóm nghiên cứu nên có bao nhiêu bạn và cách phân công ra sao?',
    answer: 'Quy định chung của Bộ GD&ĐT cho phép nhóm từ 1 đến 5 sinh viên. Số lượng lý tưởng nhất là 3–4 bạn: 1 bạn trưởng nhóm quản lý tiến độ và viết chính, 1-2 bạn phụ trách phân tích dữ liệu/kỹ thuật, và 1 bạn lo việc khảo sát thực địa, chuẩn bị tài liệu và biên tập.'
  },
  {
    id: 'faq-5',
    question: 'NOVA Research hỗ trợ sinh viên với chi phí như thế nào?',
    answer: 'NOVA Research hoạt động theo mô hình phi lợi nhuận 100%. Tất cả các buổi tư vấn định hướng đề tài, tài liệu mẫu, và kết nối Mentor ban đầu đều hoàn toàn miễn phí, với mục đích thắp lên ngọn lửa nghiên cứu trong thế hệ trẻ Việt Nam.'
  }
];
