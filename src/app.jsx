
        const { useState, useEffect, useRef } = React;

        const Icon = ({ name, size = 20, className = "" }) => {
            const key = name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
            const definition = window.lucide?.icons?.[key];
            return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                {definition?.[2]?.map(([tag, attrs], index) => React.createElement(tag, { ...attrs, key: index }))}
            </svg>;
        };

        const nickelTestSteps = [
            { photo: 1, title: '原水外觀', description: '試驗開始時的廢液呈綠色，記錄處理前的外觀。' },
            { photo: 4, title: '加入 MC2 後', description: '加入 MC2 金屬捕集劑後的反應紀錄，液體呈深色，可見深色固體。' },
            { photo: 5, title: '靜置沉澱', description: '後續不再添加其他藥劑，靜置觀察固體沉降與液層變化。' },
            { photo: 6, title: '沉澱分層', description: '可觀察到上層液體與下層沉澱分層，呈現本次試驗的沉澱外觀。' }
        ];

        const zincNickelTestSteps = [
            { photo: 2, title: '鋅鎳合金鍍液', description: '鋅鎳合金鍍液的處理前外觀。' },
            { photo: 1, title: '稀釋 20 倍', description: '依線上稀釋比例稀釋 20 倍，記錄稀釋後的液體外觀。' },
            { photo: 6, title: '加入藥劑一', description: '加入藥劑一後的反應外觀紀錄。' },
            { photo: 5, title: '加入藥劑二', description: '接續加入藥劑二，記錄此階段的反應外觀。' },
            { photo: 4, title: '加入藥劑三', description: '接續加入藥劑三，記錄此階段的反應外觀。' },
            { photo: 3, title: '沉澱分層', description: '靜置後可觀察到上層液體與下層沉澱分層。' }
        ];

        const WastewaterTestCase = ({ onContact, variant = 'nickel' }) => {
            const [step, setStep] = useState(0);
            const isZinc = variant === 'zinc';
            const steps = isZinc ? zincNickelTestSteps : nickelTestSteps;
            const prefix = isZinc ? './assets/zinc-nickel-cutout-0' : './assets/nickel-cutout-0';
            const current = steps[step];
            const previews = [steps[0], steps[steps.length - 1]];
            return <section id={isZinc ? "wastewater-tests-zinc" : "wastewater-tests"} className="mb-14 scroll-mt-28">
                {!isZinc && <>
                <span className="font-mono text-clarity text-xs tracking-widest uppercase block mb-3">Treatment in Action</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-3">廢水處理實例</h2>
                <p className="text-steel leading-relaxed mb-6">從實際試驗，看見加藥反應與沉澱分層的過程。</p></>}
                <details className="group bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)]">
                    <summary className="cursor-pointer list-none p-5 md:p-8 focus-visible:outline-offset-[-4px]">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div>
                                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-clarity/10 text-clarity mb-4">{isZinc ? '鋅鎳合金鍍液・燒杯試驗' : '化學鎳廢液・瓶杯試驗'}</span>
                                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink-text mb-3">{isZinc ? '鋅鎳合金鍍液處理測試' : '高濃度化學鎳廢液處理測試'}</h3>
                                <p className="text-steel text-sm leading-relaxed mb-4">{isZinc ? '依線上比例稀釋 20 倍後，依序加入藥劑一、藥劑二與藥劑三，記錄反應變化及沉澱分層的過程。' : '以四張現場試驗照片，記錄原水、MC2 金屬捕集劑加入後的反應，以及靜置沉澱過程。'}</p>
                                <div className="text-sm text-ink-text mb-5">使用藥劑：<strong className="text-clarity">{isZinc ? '藥劑一／藥劑二／藥劑三' : 'MC2 金屬捕集劑'}</strong></div>
                                <span className="inline-flex items-center gap-2 rounded-lg bg-ink text-white px-4 py-3 text-sm font-medium group-open:hidden">查看 {steps.length} 階段反應照片 <Icon name="chevron-down" size={16} /></span>
                                <span className="hidden group-open:inline-flex items-center gap-2 text-clarity text-sm font-medium">收合反應過程 <Icon name="chevron-up" size={16} /></span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {previews.map(photo => <figure key={photo.photo} className="bg-mist rounded-lg overflow-hidden">
                                    <img loading="lazy" decoding="async" src={prefix + photo.photo + '.webp'} alt={photo.title} className="w-full h-44 md:h-52 object-contain" />
                                    <figcaption className="text-center py-2 text-xs font-medium text-steel">{photo.title}</figcaption>
                                </figure>)}
                            </div>
                        </div>
                    </summary>
                    <div className="p-5 md:p-8 border-t border-steel/15">
                        <p className="text-sm text-steel mb-4">依照實際拍攝順序排列。點選階段或使用下一張，查看各階段的試驗外觀。</p>
                        <div role="group" aria-label="選擇試驗階段" className={'grid grid-cols-2 ' + (isZinc ? 'md:grid-cols-6' : 'md:grid-cols-4') + ' gap-2 mb-5'}>
                            {steps.map((item, index) => <button type="button" key={item.title} aria-pressed={step === index} onClick={() => setStep(index)}
                                className={'rounded-lg border px-2 py-3 text-xs md:text-sm transition-colors ' + (step === index ? 'bg-ink text-white border-ink' : 'bg-mist text-steel border-steel/20 hover:border-clarity')}>
                                <span className="block font-mono mb-1">0{index + 1}</span>{item.title}
                            </button>)}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <figure className="bg-mist rounded-lg overflow-hidden">
                                <img key={step} src={prefix + current.photo + '.webp'} alt={current.title + '：' + current.description} decoding="async" className="w-full h-[48vh] md:h-[480px] object-contain animate-fade-in-up" />
                            </figure>
                            <div>
                                <div aria-live="polite" aria-atomic="true">
                                    <span className="font-mono text-xs text-clarity block mb-2">STEP 0{step + 1} / 0{steps.length}</span>
                                    <h4 className="font-serif text-xl font-bold text-ink-text mb-3">{current.title}</h4>
                                    <p className="text-steel leading-relaxed mb-6">{current.description}</p>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <button type="button" disabled={step === 0} onClick={() => setStep(value => value - 1)} className="border border-steel/25 rounded-lg px-4 py-3 text-sm disabled:opacity-30">上一張</button>
                                    <button type="button" disabled={step === steps.length - 1} onClick={() => setStep(value => value + 1)} className="bg-ink text-white rounded-lg px-4 py-3 text-sm disabled:opacity-30">下一張</button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-xs text-steel leading-relaxed border-t border-steel/15 pt-4">照片呈現本次試驗的外觀變化；處理成效與是否符合排放要求，需依水質檢測結果判定。實際使用方案依廢水特性評估。</p>
                        <button type="button" onClick={onContact} className="mt-5 bg-clarity text-white rounded-lg px-5 py-3 text-sm font-medium">{isZinc ? '諮詢鋅鎳合金鍍液處理方案' : '諮詢化學鎳廢液處理方案'}</button>
                    </div>
                </details>
            </section>;
        };

        const App = () => {
            const [scrolled, setScrolled] = useState(false);
            const [selectedCase, setSelectedCase] = useState(null);
            const [selectedChemGroup, setSelectedChemGroup] = useState('cod');
            const [selectedChemId, setSelectedChemId] = useState('trt-nao');
            const [formSubmitted, setFormSubmitted] = useState(false);
            const [formData, setFormData] = useState({
                name: '', phone: '', company: '', waterType: '', product: '', compounds: [], needType: '索取藥劑樣品'
            });

            // 詢問欄（分類導覽）
            const [menuOpen, setMenuOpen] = useState(false);
            const [activePage, setActivePage] = useState(() => ['wastewater', 'sludge', 'automation'].includes(location.hash.slice(1)) ? location.hash.slice(1) : null);
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
            const dialogRef = useRef(null);
            const [chemicalDialogOpen, setChemicalDialogOpen] = useState(false);
            const chemicalDialogRef = useRef(null);
            const selectChemical = (id) => {
                setSelectedChemId(id);
                if (window.matchMedia('(max-width: 1023px)').matches) setChemicalDialogOpen(true);
            };

            const inquiryCategories = [
                { key: 'wastewater', label: '廢水處理', sub: '高COD、高濃度廢液', blurb: '高 COD、高濃度廢水廢液處理藥劑與設備', icon: 'flask-conical' },
                { key: 'sludge', label: '污泥處理', sub: '減量與脫水乾燥', blurb: '污泥減容、脫水設備與藥劑整合方案', icon: 'layers' },
                { key: 'automation', label: '人機自動化', sub: '監控與自動化設備', blurb: '製程自動化整合與監控設備', icon: 'cpu' },
            ];

            const navigate = (target) => {
                setMobileMenuOpen(false);
                setMenuOpen(false);
                if (location.hash === '#' + target) {
                    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                } else location.hash = target;
            };
            const goToCategory = (key) => navigate(key);
            const goHome = () => navigate('top');
            const goToContactSection = () => navigate('聯絡我們');
            const requestSample = () => {
                setChemicalDialogOpen(false);
                setFormSubmitted(false);
                setFormData(previous => ({ ...previous, product: currentChem.name, needType: '索取藥劑樣品' }));
                goToContactSection();
            };
            useEffect(() => {
                const syncLocation = () => {
                    let target;
                    try { target = decodeURIComponent(location.hash.slice(1)); } catch { target = 'top'; }
                    setChemicalDialogOpen(false);
                    setActivePage(['wastewater', 'sludge', 'automation'].includes(target) ? target : null);
                    setMobileMenuOpen(false);
                    setMenuOpen(false);
                };
                window.addEventListener('hashchange', syncLocation);
                return () => window.removeEventListener('hashchange', syncLocation);
            }, []);
            useEffect(() => {
                const frame = requestAnimationFrame(() => {
                    let target;
                    try { target = decodeURIComponent(location.hash.slice(1)); } catch { target = 'top'; }
                    if (activePage) window.scrollTo({ top: 0, behavior: 'instant' });
                    else if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                });
                return () => cancelAnimationFrame(frame);
            }, [activePage]);
            useEffect(() => {
                const handleScroll = () => setScrolled(window.scrollY > 40);
                handleScroll();
                window.addEventListener('scroll', handleScroll, { passive: true });
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);
            useEffect(() => {
                if (!selectedCase && !chemicalDialogOpen) return;
                const activeDialogRef = chemicalDialogOpen ? chemicalDialogRef : dialogRef;
                const previousFocus = document.activeElement;
                const previousOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                activeDialogRef.current?.focus({ preventScroll: true });
                const handleKey = (event) => {
                    if (event.key === 'Escape') { setSelectedCase(null); setChemicalDialogOpen(false); }
                    if (event.key !== 'Tab') return;
                    const nodes = [...activeDialogRef.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')];
                    const first = nodes[0], last = nodes[nodes.length - 1];
                    if (event.shiftKey && (document.activeElement === first || document.activeElement === activeDialogRef.current)) { event.preventDefault(); last?.focus(); }
                    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === activeDialogRef.current)) { event.preventDefault(); first?.focus(); }
                };
                document.addEventListener('keydown', handleKey);
                return () => {
                    document.removeEventListener('keydown', handleKey);
                    document.body.style.overflow = previousOverflow;
                    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
                };
            }, [selectedCase, chemicalDialogOpen]);
            useEffect(() => {
                const desktop = window.matchMedia('(min-width: 1024px)');
                const closeOnDesktop = () => { if (desktop.matches) setChemicalDialogOpen(false); };
                desktop.addEventListener('change', closeOnDesktop);
                return () => desktop.removeEventListener('change', closeOnDesktop);
            }, []);

            const coreFeatures = [
                { title: "鉻酸深度純化回收", icon: "recycle", badge: "台灣唯一實績", highlight: "獨家離子分離純化技術，將劇毒六價鉻廢水轉化為可回收再利用的高純度製程原料，大幅減少劇毒污泥與清運費用。", stat: "鉻酸回收率最高達 95%" },
                { title: "生物污泥高真空乾燥", icon: "flame", badge: "發明型專利", highlight: "專利加熱型板框擠壓＋高真空負壓乾燥，泥餅含水率穩定降至 20% 以下，大幅減少污泥清運量與能源成本。", stat: "脫水含水率穩定低於 20%" },
                { title: "高 COD 特異性裂解", icon: "flask-conical", badge: "低化學污泥", highlight: "小佔地高能裂解系統搭配專利藥劑，深度分解 COD、氰化物、硝酸鹽氮等難降解物質，不產生二次化學鐵污泥。", stat: "COD 可由 24,000ppm 降至 600ppm 以下" },
                { title: "藥劑設備跨領域整合", icon: "layers", badge: "客製化技術", highlight: "藥劑與自研專利設備一站式整合，融合電化學、薄膜分離、真空濃縮等技術，運維無推諉。", stat: "設備可連續穩定運轉 10–20 年" }
            ];

            const coreEquipment = [
                { name: "RST-3500 精密刮泥沈澱槽", desc: "集合沈澱與濃縮於一體，完全不積泥，極大化烘乾效率。" },
                { name: "HPF-800 中壓自動脫水機", desc: "可承受 8kg/cm² 入料壓力，泥餅含水率遠優於傳統型號。" }
            ];

            const coreOfferings = [
                {
                    key: 'chemical',
                    icon: 'flask-conical',
                    eyebrow: '跨領域整合水處理藥劑',
                    title: '工業廢水處理藥劑　效果更好且用藥更合理',
                    desc: '台灣雷德斯減廢科技股份有限公司提供客製化廢水處理藥劑服務，跨領域的技術整合（如：搭配電化學、UF膜、UV光學、真空濃縮、離子交換樹脂），可提供客戶優質且節省成本的藥劑規劃方案，尤其是在振動研磨廢水、化學鎳、鉻酸純化等各工業製程領域取得卓越成績，除確保廢水處理效果達到排放標準且符合法規外，若輔以業主的配合，可成功轉為資源化再利用，協助客戶節省數百萬元。',
                    imgUrl: './assets/image-d22b470de169.webp',
                    linkTo: 'wastewater'
                },
                {
                    key: 'equipment',
                    icon: 'settings',
                    eyebrow: '多項專利設備技術',
                    title: '工業廢水處理設備　多項專利技術研發優勢',
                    desc: '雷德斯TRT有超過35年豐富的工業製程廢水廢液處理經驗，開發出佔地小、具高效率高效能的廢水系統處理設備，能夠應對各種不同類型的廢水處理問題，根據客戶的需求提供全方位的解決方案，以確保最佳處理效果，又因講究細節，實際設備可連續運轉長達數十年，為客戶提升整體產能，獲得高度評價。',
                    imgUrl: './assets/image-6dbdd31ec808.webp',
                    linkTo: 'sludge'
                }
            ];

            const sludgeEquipment = [
                {
                    name: "HPF-800 中高壓污泥脫水機",
                    imgUrl: './assets/image-079a944b1f9b.webp',
                    features: [
                        "高強度結構不容易變形、噴漿",
                        "耐高壓，可承受約8kg/cm2或以上的入料壓力",
                        "脫水效益大幅提高",
                        "整體設計大幅減少油壓缸空間",
                        "可多提昇機械能脫水重量約10%以上",
                        "結合獨家沈澱槽，每批次可縮短一倍到數倍時間，一台效率可抵數台",
                        "一併同時減少後段污泥烘乾的能耗成本",
                        "實測現場使用年限已長達20年，仍在使用中"
                    ]
                },
                {
                    name: "SD-500 污泥烘箱",
                    imgUrl: './assets/image-2f966848c52e.webp',
                    features: [
                        "與污泥脫水機共構，空間小也適用",
                        "共構設計大幅減少所需空間",
                        "脫水、乾燥、裝袋一體完成",
                        "人機介面系統設計",
                        "可彈性調整攪拌、溫度、烘乾時間"
                    ]
                }
            ];

            const wastewaterResults = [
                "振動研磨高濃度廢液，COD 24000ppm→600ppm以下",
                "電泳漆排水，COD 1000ppm→50ppm",
                "染整定型高濃度COD 8600ppm→600ppm以下",
                "化學鎳老化液高濃度COD處理，46000~62000ppm→數千ppm",
                "磷酸鹽皮膜廢水，COD處理，800ppm→80ppm",
                "國內PCB大廠化學鎳原液，鎳60000ppm→100ppm",
                "多家含鎳製程排水<0.5ppm，低濃度排水添加，可滿足加嚴標準",
                "氟處理劑 化學拋光排水130ppm→<15ppm",
                "硝酸製程排水中的硝酸鹽氮由120ppm降至10ppm，去除率達90%",
                "氰化物高濃度廢液，120000ppm以上→<100ppm，可除99%~99.9%"
            ];

            const wastewaterEquipmentFeatures = [
                "可回收原物料與製程用水",
                "可24小時運轉，降低停工機率",
                "可大幅降低污泥產生量",
                "運轉費用極低、節省人事費用",
                "耐久材設備，比傳統系統使用年限長",
                "模組化設計，可拆卸遷移且佔地小",
                "自動化的人機使用介面",
                "操作維護技術簡單、維護成本低",
                "雷德斯TRT研發新型專利設計",
                "系統回收處理穩定性極高"
            ];

            const automationFeatures = [
                "廢水廠各處理接點導入 PLC（可程式控制器）人機介面進行即時監控",
                "可依現場製程需求，個別設定各接點的異常上下限",
                "接點數值超過設定上下限時，系統自動產生異常訊息紀錄",
                "同步顯示異常燈號，現場人員只需依燈號判別即可立即前往處理"
            ];

            const chemicalDatabase = {
                cod: {
                    groupTitle: "COD 降解系列",
                    items: [
                        { id: 'trt-na', name: 'TRT-NA 奈米吸附強效混凝劑', type: '粉體', desc: '可降COD、生物代謝臭味（生物污泥、糞便），並具快速混凝等特性；適用振動研磨或其它高 COD 環境。', imgUrl: './assets/image-d5d6ac4e2519.webp' },
                        { id: 'trt-l1', name: 'TRT-L1 多用途強效液態混凝劑', type: '液體', desc: '強效多用途混凝劑；用於高濃度 COD、電泳漆、紡織上漿、銀變色防止液等工業複雜廢水處理。', imgUrl: './assets/image-d22b470de169.webp' },
                        { id: 'trt-nao', name: 'TRT-NAO 奈米級強效粉體混凝劑', type: '粉體', desc: '專利複配粉劑，具備極強的架橋凝聚作用，對於懸浮固體與溶解性膠體沉降速度極快，適用於高 COD 製程廢水。', imgUrl: './assets/image-cd7b69551783.webp' },
                        { id: 'trt-oc', name: 'TRT-OC 溶解性 COD 分解劑', type: '液體', desc: '專用於處理單元末段。適用於大水量、中低濃度（約 150ppm 左右）有機物降解把關。', imgUrl: './assets/image-63ecbcd3fed1.webp' },
                        { id: 'trt-cao', name: 'TRT-CaO 溶解性 COD 催化劑', type: '液體', desc: '需搭配觸媒塔。利用催化劑與多孔填料接觸氧化特性，充分裂解大分子 COD，適用各種不同濃度範圍廢水。', imgUrl: './assets/image-09639375fd25.webp' },
                        { id: 'trt-s8000', name: 'TRT-S8000 活性碳 COD 吸附粉劑', type: '粉體', desc: '高碘值、粒徑小於 200mesh 的粉狀活性碳。利用超大比表面積強力吸附 COD，濾渣含水率低，消泡能力顯著優於常規再生碳。', imgUrl: './assets/image-d50fcea844aa.webp' }
                    ]
                },
                fluoride: {
                    groupTitle: "F(氟) 去除系列",
                    items: [
                        { id: 'trt-fb', name: 'TRT-FB 除氟粉體混凝劑', type: '粉體', desc: '多孔性鈣鹽吸附劑。需與 TRT-K1 搭配使用，形成二種藥劑協同反應。具高 pH 值、多孔吸附特徵，污泥產量極少。化學拋光廢水實測可由 130ppm 降至 15ppm 以下。', imgUrl: './assets/image-b69602745d8d.webp' },
                        { id: 'trt-k1', name: 'TRT-K1 除氟液態混凝劑', type: '液體', desc: '高分子液態除氟反應劑。需與 TRT-FB 搭配使用。針對各類高低專度的氟離子進行架橋去除，污泥產生量較傳統合併石灰與氯化鈣舊法顯著減少。', imgUrl: './assets/image-8070b3678253.webp' }
                    ]
                },
                nitrogen: {
                    groupTitle: "硝酸鹽氮去除系列",
                    items: [
                        { id: 'trt-can', name: 'TRT-CaN 總氮觸媒反應劑', type: '液體', desc: '專利複配液態觸媒。需搭配特定電化學反應設備，形成高效催化裂解反應，適用於低水量高濃度或較大水量中低濃度的工業氮源，如硝酸製程排水中硝酸鹽氮由 120ppm 降至 10ppm，去除率高達 90% 以上。', imgUrl: './assets/image-88f6bb16c6f6.webp' }
                    ]
                },
                cyanide: {
                    groupTitle: "氰化物與螯合鍵破壞系列",
                    items: [
                        { id: 'trt-dow-cn', name: 'TRT-DOW 高濃度氰化物分解主劑', type: '液體', desc: '高強度氧化主劑。需與 TRT-GC 搭配使用，並配置特定密閉反應槽與廢氣排氣控制。可將十多萬 ppm 級之超高濃度氰化物廢液深度破壞（分解率達 99% - 99.99%），例如實測可由 120,000ppm 降至 100ppm 以下。', imgUrl: './assets/image-e0a225c91287.webp' },
                        { id: 'trt-gc', name: 'TRT-GC 螯合解離反應液', type: '液體', desc: '需與 TRT-DOW 搭配使用，並依螯合重金屬種類與濃度調整加藥比例。能有效克服鐵、鎳等金屬離子與氰基形成的頑固共價錯合物，實現完全解離沉澱。', imgUrl: './assets/image-56afed29a30f.webp' }
                    ]
                },
                metal: {
                    groupTitle: "金屬離子捕集系列",
                    items: [
                        { id: 'trt-mc2-metal', name: 'TRT-MC2 低 COD 特異性金屬捕集劑', type: '液體', desc: '克服常規市售捕集劑會大幅拉高放流水 COD 的缺陷。TRT 產品用藥量極省，COD 增幅不明顯、螯合沉澱顆粒巨大，沈降速度極快。國內 PCB 大廠化學鎳原液鎳由 60,000ppm 降至 100ppm；多家含鎳製程排水低濃度排水添加，穩定控制於 0.5ppm 以下，滿足國家加嚴標準。', imgUrl: './assets/image-c3efc47922be.webp' }
                    ]
                },
                color: {
                    groupTitle: "脫色與印染破色系列",
                    items: [
                        { id: 'trt-dc', name: 'TRT-DC 低濃度色度混凝劑', type: '液體', desc: '多功能液態去色劑。適用於低濃度色料印染廢水或大水量低色度之末端排放把關，用量極省。', imgUrl: './assets/image-3f6fd45277f6.webp' },
                        { id: 'trt-dow-color', name: 'TRT-DOW 高濃度色度破壞主反應劑', type: '液體', desc: '需與 TRT-HT 搭配使用，並配置特定反應釜與小型板框污泥脫水機。專攻高濃度染料廢液處理，如日商奧野全黑金屬染料廢液、彩色螺絲金屬染料廢液，處理後可安全併入低濃度廢水廠處理排放。', imgUrl: './assets/image-d845ba7379f8.webp' },
                        { id: 'trt-ht', name: 'TRT-HT 高濃度色度破壞觸媒', type: '液體', desc: '黃棕色液態複合觸媒。需與 TRT-DOW 搭配使用，並配置特定反應釜與板框污泥脫水機，催化破壞共軛染料顯色基團。', imgUrl: './assets/image-09639375fd25.webp' }
                    ]
                },
                boron: {
                    groupTitle: "硼去除系列",
                    items: [
                        { id: 'trt-db', name: 'TRT-DB 特製除硼劑', type: '液體/粉體', desc: '專為半導體、光電及化學工業之含硼廢水開發。強效螯合除硼，歡迎來電洽詢安排現場試驗。', imgUrl: './assets/image-6f09415199a7.webp' }
                    ]
                }
            };

            const cases = [
                {
                    company: "永達工業研磨有限公司",
                    title: "鍍鎳鉻及化拋製程廢水處理",
                    industry: "台灣・臺中",
                    site: "工程地區：臺灣 臺中",
                    badges: ["鎳鉻電鍍", "化學拋光", "氟", "氨氮", "硝酸鹽氮", "純水"],
                    shortOutcome: "運轉超過 20 年、每日 24 小時，穩定控制排水各項指標",
                    desc: "前段化學拋光含氟、氨氮、雙氧水等，後段為鍍鎳鉻製程，運轉超過20年，每日24小時，穩定控制排水中的COD、鎳、鉻、氟、硝酸鹽氮等。",
                    owner: "永達工業研磨有限公司",
                    process: "台中大型手工具鎳鉻電鍍",
                    icon: "check-circle",
                    imgUrl: './assets/image-7688a01bd7c3.webp'
                },
                {
                    company: "SANDTON HOLDINGS CORPORATION",
                    title: "農膜回收及水循環回收",
                    industry: "美國・加利福尼亞州",
                    site: "工程地區：美國 加利福尼亞州",
                    badges: ["PE農膜回收", "大量砂土", "農藥", "肥料", "生物污泥", "水回收"],
                    shortOutcome: "農膜回收清洗再製流程中的水資源循環再利用方案",
                    desc: "美國農膜在地回收清洗，再製成垃圾袋，除前段的破碎分離外，需盡可能洗淨及乾燥；水質中的農藥、肥料分解產生生物污泥及缺水環境下的水回用。",
                    owner: "SANDTON HOLDINGS CORPORATION",
                    process: "加州農膜再利用製程",
                    icon: "cpu",
                    imgUrl: './assets/image-362f6190cb4f.webp'
                },
                {
                    company: "中國石油化學工業開發股份有限公司",
                    title: "大型土壤汙染整治環保工程",
                    industry: "台灣・台南",
                    site: "環保工程實施地點：台南",
                    badges: ["戴奧辛污染", "水力分選", "濃縮", "土壤整治"],
                    shortOutcome: "戴奧辛污染土壤水力分選濃縮之整治工程",
                    desc: "土壤污染(戴奧辛污染水力分選濃縮)土壤整治工程。",
                    owner: "中國石油化學工業開發股份有限公司",
                    icon: "shield-check",
                    imgUrl: './assets/image-45dbe61bf1b6.webp'
                },
                {
                    company: "永慶聯科技有限公司",
                    title: "鉻酸純化回收",
                    industry: "台灣・台南",
                    site: "環保工程安裝地點：台南",
                    badges: ["硬鉻電鍍", "鉻酸廢液", "鐵銅", "氯離子純化"],
                    shortOutcome: "硬鉻電鍍鉻酸廢液純化回收系統",
                    desc: "硬鉻電鍍(鉻酸廢液、鐵銅、氯離子污染純化)製程回收系統。",
                    owner: "永慶聯科技有限公司",
                    icon: "recycle",
                    imgUrl: './assets/image-699204696b66.webp'
                }
            ];

            const designPrinciples = [
                { icon: "layers", title: "講究「濃淡分離」", desc: "透過分析測試精確確定廢水的特性，掌控濃度波動影響，在前置處理時也加高效，提升了後段處理效率，大幅減少成本。" },
                { icon: "shuffle", title: "掌握「以廢治廢」", desc: "探索污染物質彼此之間交互作用的可能性，在適當的時機混合以達到部分污染低濃、減少廢物產生，降低處理的費用。" },
                { icon: "recycle", title: "資源「可再利用」", desc: "將原本的污染物返回成為原物料，不僅減少污染和廢棄物產生，還可以從經濟效益上創造價值，實現環保和經濟的雙贏。" }
            ];

            const handleFormSubmit = (e, selectedProvider) => {
                e.preventDefault();
                const bodyLines = [
                    `姓名：${formData.name}`,
                    `聯絡電話：${formData.phone}`,
                    `公司名稱與部門：${formData.company}`,
                    `廢水類型：${formData.waterType || '未填寫'}`,
                    `關注項目：${formData.compounds.length ? formData.compounds.join('、') : '未勾選'}`,
                    `需求類型：${formData.needType}`,
                    `指定藥劑：${formData.product || '未指定'}`
                ];
                const mailtoUrl = `mailto:trt9002@yahoo.com.tw?subject=${encodeURIComponent('【官網詢問】' + formData.company + ' - ' + formData.needType)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
                const provider = selectedProvider || e.nativeEvent?.submitter?.value || 'gmail';
                if (provider === 'gmail') {
                    const params = new URLSearchParams({
                        view: 'cm', fs: '1', to: 'trt9002@yahoo.com.tw',
                        su: '【官網詢問】' + formData.company + ' - ' + formData.needType,
                        body: bodyLines.join('\n')
                    });
                    window.open('https://mail.google.com/mail/?' + params.toString(), '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = mailtoUrl;
                }
                setFormSubmitted(true);
            };

            const handleCheckboxChange = (compound) => {
                const current = [...formData.compounds];
                const index = current.indexOf(compound);
                if (index > -1) { current.splice(index, 1); } else { current.push(compound); }
                setFormData({ ...formData, compounds: current });
            };

            const getSelectedChemObject = () => {
                const group = chemicalDatabase[selectedChemGroup];
                if (!group) return null;
                return group.items.find(item => item.id === selectedChemId) || group.items[0];
            };
            const currentChem = getSelectedChemObject();

            const MonoTag = ({ children, tone = 'clarity' }) => (
                <span className={`inline-flex items-center font-mono text-[11px] tracking-[.12em] uppercase px-2.5 py-1 border ${tone === 'clarity' ? 'text-clarity border-clarity/40 bg-clarity/5' : 'text-sediment border-sediment/40 bg-sediment/5'}`}>{children}</span>
            );

            return (
                <div className="min-h-screen bg-mist">
                    {/* ==================== 導覽列 ==================== */}
                    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-ink/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-ink/30 backdrop-blur-sm py-5'}`}>
                        <div className="max-w-7xl mx-auto pl-4 pr-16 lg:px-6 flex justify-between items-center gap-4">
                            <button onClick={goHome} className="flex items-center gap-4 min-w-0">
                                <img decoding="async" src="./assets/image-af4dd8c8635d.webp" alt="TRT Logo" className="w-10 h-10 object-contain shrink-0" />
                                <div className="flex flex-col border-l border-white/15 pl-4 h-9 justify-center text-left min-w-0">
                                    <span className="text-base font-bold tracking-wide text-mist font-serif truncate">台灣雷德斯減廢科技</span>
                                    <span className="text-[9px] font-mono uppercase text-steel tracking-wider truncate">Taiwan Raiders Waste Reduction Technology Corp.</span>
                                </div>
                            </button>
                            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                                {!activePage && (
                                    <div className="hidden lg:flex gap-8 font-mono text-sm tracking-widest text-mist/80 uppercase">
                                        <a href="#服務項目" className="hover:text-clarity-light transition-colors">服務項目</a>
                                        <a href="#實績案例" className="hover:text-clarity-light transition-colors">實績案例</a>
                                        <a href="#聯絡我們" className="hover:text-clarity-light transition-colors">聯絡我們</a>
                                    </div>
                                )}
                                <div className="hidden lg:flex items-center gap-4">
                                    <a href="tel:0222866693" className="text-base font-mono font-medium text-mist flex items-center gap-2"><Icon name="phone" size={15} className="text-clarity-light" />02-2286-6693</a>
                                    <button onClick={goToContactSection} className="bg-clarity text-ink hover:bg-clarity-light px-6 py-2.5 font-bold text-sm uppercase tracking-widest transition-all">{activePage ? '回首頁聯絡我們' : '立即詢問'}</button>
                                </div>
                            </div>
                        </div>
                        <button aria-label="切換導覽選單" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden absolute right-4 top-5 p-2 text-mist bg-ink">
                            <Icon name={mobileMenuOpen ? 'x' : 'menu'} />
                        </button>
                        {mobileMenuOpen && <div id="mobile-navigation" className="lg:hidden bg-ink px-6 py-5 grid gap-4 text-mist">
                            <button onClick={goHome} className="text-left">首頁</button>
                            {inquiryCategories.map(cat => <button key={cat.key} onClick={() => goToCategory(cat.key)} className="text-left">{cat.label}</button>)}
                            {['服務項目', '實績案例', '聯絡我們'].map(target => <button key={target} onClick={() => navigate(target)} className="text-left">{target}</button>)}
                        </div>}
                    </nav>

                    {!activePage ? (<>
                    {/* ==================== HERO ==================== */}
                    <section id="top" className="relative overflow-hidden bg-ink pt-32 pb-0">
                        <div className="hero-bg" style={{ backgroundImage: "url('./assets/image-f9b2d5059bb1.webp')" }}></div>
                        <div className="absolute inset-0 hero-wash"></div>
                        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pb-20">
                            <span className="inline-flex items-center gap-3 font-mono text-clarity-light/90 tracking-[.2em] text-xs uppercase mb-8">
                                <span className="w-6 h-px bg-clarity-light/60"></span>EST. 1990 · 35 YEARS<span className="w-6 h-px bg-clarity-light/60"></span>
                            </span>
                            <h1 className="font-serif text-3xl md:text-5xl font-bold text-mist leading-[1.35] mb-6 max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
                                <span className="text-clarity-light">雷德斯TRT</span>｜秉持精益求精的<br className="hidden md:block" />環境工程專業技術
                            </h1>
                            <p className="font-sans text-base md:text-lg text-mist/75 leading-[1.9] max-w-xl mx-auto mb-7">
                                因應各項環保法規及放流水標準，開發高效工業廢水處理藥劑/藥品與穩固耐用之處理設備，廣泛得到客戶青睞肯定與長期配合。
                            </p>
                            <p className="font-mono text-sm text-sediment-light/90 tracking-wide mb-10">
                                專精振動研磨廢水處理・化學鎳工業製程高濃度廢液處理
                            </p>
                            <div className="w-28 h-[3px] mx-auto mb-10" style={{ background: 'linear-gradient(90deg,#B07A3E,#4FC3AC)' }}></div>

                            {/* 詢問欄：分類導覽 */}
                            <div className="max-w-xl mx-auto mb-8 text-left">
                                <button
                                    aria-expanded={menuOpen} aria-controls="category-menu" onClick={() => setMenuOpen(!menuOpen)}
                                    className="w-full flex items-center justify-between border border-white/25 bg-white/5 backdrop-blur-sm px-5 py-4 text-mist hover:border-clarity-light/60 transition-colors"
                                >
                                    <span className="flex items-center gap-3 text-base font-mono">
                                        <Icon name="search" size={16} className="text-clarity-light" />
                                        選擇您想了解的服務項目
                                    </span>
                                    <Icon name={menuOpen ? 'chevron-up' : 'chevron-down'} size={18} className="text-steel" />
                                </button>

                                {menuOpen && (
                                    <div id="category-menu" className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 mt-px animate-fade-in-up">
                                        {inquiryCategories.map((cat) => (
                                            <button
                                                key={cat.key}
                                                onClick={() => goToCategory(cat.key)}
                                                className="bg-ink hover:bg-ink-2 p-5 text-left flex items-start gap-4 transition-colors"
                                            >
                                                <div className="w-10 h-10 border border-clarity/30 text-clarity-light flex items-center justify-center shrink-0"><Icon name={cat.icon} size={18} /></div>
                                                <div>
                                                    <span className="block text-base font-bold text-mist">{cat.label}</span>
                                                    <span className="block text-xs font-mono text-steel mt-0.5">{cat.sub}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ==================== 藥劑與設備 ==================== */}
                    <section id="服務項目" className="py-24 md:py-32 bg-gradient-to-b from-white to-mist border-b border-steel/15">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">Chemicals &amp; Equipment</span>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink-text">藥劑與設備</h2>
                            </div>
                            <div className="w-16 h-[3px] mx-auto mb-10" style={{ background: 'linear-gradient(90deg,#B07A3E,#4FC3AC)' }}></div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {coreOfferings.map((item) => (
                                    <div key={item.key} className="bg-white flex flex-col rounded-xl overflow-hidden shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] hover:shadow-[0_16px_40px_-14px_rgba(16,32,31,0.32)] transition-shadow">
                                        <div className="h-64 md:h-72 overflow-hidden">
                                            <img loading="lazy" decoding="async" src={item.imgUrl} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-8 md:p-10 flex flex-col gap-4 flex-grow">
                                            <span className="inline-flex items-center gap-2 font-mono text-clarity text-xs uppercase tracking-widest">
                                                <Icon name={item.icon} size={15} />{item.eyebrow}
                                            </span>
                                            <h3 className="font-serif text-2xl font-bold text-ink-text leading-snug" style={{ textWrap: 'balance' }}>{item.title}</h3>
                                            <p className="text-sm text-steel font-light leading-relaxed flex-grow">{item.desc}</p>
                                            <button onClick={() => goToCategory(item.linkTo)} className="self-start text-sm font-mono font-medium text-clarity border-t border-steel/20 pt-4 mt-2 hover:text-clarity-light">深入了解 →</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ==================== 雷德斯環境工程設計三原則 ==================== */}
                    <section id="設計三原則" className="bg-gradient-to-b from-white to-mist py-24 md:py-32 border-b border-steel/15">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">Our Design Principles</span>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink-text mb-4">雷德斯環境工程設計三原則</h2>
                                <p className="text-base text-steel font-light leading-relaxed">我們的核心價值在於根據客戶的需求和特定的環境條件，提供高品質定制化的解決方案，以實現環境保護和客戶滿意度的雙贏局面。</p>
                            </div>
                            <div className="w-16 h-[3px] mx-auto mb-10" style={{ background: 'linear-gradient(90deg,#B07A3E,#4FC3AC)' }}></div>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {designPrinciples.map((p, idx) => (
                                    <div key={idx} className="bg-white shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] hover:shadow-[0_16px_40px_-14px_rgba(16,32,31,0.32)] transition-shadow rounded-xl p-8 md:p-10 flex flex-col items-center text-center gap-4">
                                        <div className="w-16 h-16 rounded-full border border-clarity/30 bg-clarity/5 text-clarity flex items-center justify-center"><Icon name={p.icon} size={28} /></div>
                                        <h3 className="font-serif text-xl font-bold text-ink-text">{p.title}</h3>
                                        <p className="text-sm text-steel font-light leading-relaxed">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ==================== 客戶實績案例 ==================== */}
                    <section id="實績案例" className="bg-gradient-to-b from-white to-mist py-24 md:py-32 border-b border-steel/15">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">Client Success Stories</span>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink-text">客戶實績案例</h2>
                            </div>
                            <div className="w-16 h-[3px] mx-auto mb-10" style={{ background: 'linear-gradient(90deg,#B07A3E,#4FC3AC)' }}></div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {cases.map((c, idx) => (
                                    <button key={idx} onClick={() => setSelectedCase(c)} className="text-left bg-white transition-shadow group flex flex-col rounded-xl overflow-hidden shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] hover:shadow-[0_16px_40px_-14px_rgba(16,32,31,0.32)]">
                                        <div className="h-56 overflow-hidden">
                                            <img loading="lazy" decoding="async" src={c.imgUrl} alt={c.company} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-start justify-between mb-5">
                                                <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center shrink-0"><Icon name={c.icon} size={20} /></div>
                                                <span className="font-mono text-[11px] text-steel uppercase tracking-widest text-right">{c.industry}</span>
                                            </div>
                                            <h3 className="font-serif text-xl font-bold text-ink-text mb-1">{c.title}</h3>
                                            <p className="text-sm text-steel font-mono mb-4">{c.company}</p>
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {c.badges.map((b, i) => (<span key={i} className="text-[11px] font-mono text-steel border border-steel/30 px-2 py-1">{b}</span>))}
                                            </div>
                                            <p className="text-base text-ink-text/80 font-light leading-relaxed mb-6 flex-grow">{c.shortOutcome}</p>
                                            <span className="text-sm font-mono font-medium text-clarity group-hover:underline">查看完整案例 →</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 客戶案例詳情彈窗 */}
                    {selectedCase && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm" onClick={() => setSelectedCase(null)}>
                            <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="case-title" tabIndex={-1} className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                                <button aria-label="關閉案例" onClick={() => setSelectedCase(null)} className="absolute top-6 right-6 text-white bg-ink/40 hover:bg-ink/70 rounded-full w-9 h-9 flex items-center justify-center z-10"><Icon name="x" size={20} /></button>
                                <div className="h-56 md:h-64 overflow-hidden">
                                    <img loading="lazy" decoding="async" src={selectedCase.imgUrl} alt={selectedCase.company} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-8 md:p-12">
                                    <MonoTag>{selectedCase.industry}</MonoTag>
                                    <h3 id="case-title" className="font-serif text-2xl md:text-3xl font-bold text-ink-text mt-4 mb-1">{selectedCase.title}</h3>
                                    <p className="text-base text-steel font-mono mb-8">{selectedCase.company}</p>
                                    <span className="font-mono text-xs text-steel uppercase tracking-widest block mb-3">工程特色</span>
                                    <p className="text-ink-text/80 text-base leading-relaxed mb-8">{selectedCase.desc}</p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {selectedCase.badges.map((b, i) => (<span key={i} className="text-[11px] font-mono text-steel border border-steel/30 px-2 py-1">{b}</span>))}
                                    </div>
                                    <div className={`grid ${selectedCase.process ? 'sm:grid-cols-2' : ''} gap-px bg-steel/20 border border-steel/20 rounded-lg overflow-hidden mb-6`}>
                                        <div className="bg-mist p-5">
                                            <span className="font-mono text-xs text-steel uppercase tracking-widest block mb-2">工程業主</span>
                                            <span className="text-base text-ink-text font-medium">{selectedCase.owner}</span>
                                        </div>
                                        {selectedCase.process && (
                                            <div className="bg-mist p-5">
                                                <span className="font-mono text-xs text-steel uppercase tracking-widest block mb-2">產業製程</span>
                                                <span className="text-base text-ink-text font-medium">{selectedCase.process}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-steel font-mono flex items-center gap-2"><Icon name="map-pin" size={14} className="text-clarity" />{selectedCase.site}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== 聯絡我們 ==================== */}
                    <section id="聯絡我們" className="py-24 md:py-32 bg-gradient-to-b from-white to-mist">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="text-center mb-10">
                                <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">Get In Touch</span>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink-text mb-4">聯絡我們</h2>
                                <p className="text-steel font-light text-base">歡迎直接來電，或填寫下方表單，我們的環保工程師將盡快與您聯繫。</p>
                            </div>
                            <div className="w-16 h-[3px] mx-auto mb-10" style={{ background: 'linear-gradient(90deg,#B07A3E,#4FC3AC)' }}></div>
                            <div className="grid lg:grid-cols-2 gap-12">
                                <div className="bg-white rounded-xl overflow-hidden divide-y divide-steel/10 shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)]">
                                    <a href="tel:0222866693" className="flex items-center gap-5 bg-white hover:bg-mist/50 p-6 transition-colors">
                                        <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center shrink-0"><Icon name="phone" size={20} /></div>
                                        <div><span className="block text-[11px] font-mono uppercase tracking-widest text-steel mb-1">電話（點擊可直接撥打）</span><span className="text-xl font-mono font-semibold text-ink-text">02-2286-6693</span></div>
                                    </a>
                                    <a href="mailto:trt9002@yahoo.com.tw" className="flex items-center gap-5 bg-white hover:bg-mist/50 p-6 transition-colors">
                                        <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center shrink-0"><Icon name="mail" size={20} /></div>
                                        <div><span className="block text-[11px] font-mono uppercase tracking-widest text-steel mb-1">Email</span><span className="text-xl font-mono font-semibold text-ink-text break-all">trt9002@yahoo.com.tw</span></div>
                                    </a>
                                    <div className="flex items-center gap-5 bg-white p-6">
                                        <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center shrink-0"><Icon name="message-circle" size={20} /></div>
                                        <div><span className="block text-[11px] font-mono uppercase tracking-widest text-steel mb-1">LINE 官方帳號</span><span className="text-xl font-mono font-semibold text-ink-text">trt9002</span></div>
                                    </div>
                                    <div className="flex items-center gap-5 bg-white p-6">
                                        <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center shrink-0"><Icon name="map-pin" size={20} /></div>
                                        <div><span className="block text-[11px] font-mono uppercase tracking-widest text-steel mb-1">公司地址</span><span className="text-base font-medium text-ink-text">新北市三重區溪尾街126巷15號</span></div>
                                    </div>
                                    <div className="flex items-center gap-5 bg-white p-6">
                                        <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center shrink-0"><Icon name="printer" size={20} /></div>
                                        <div><span className="block text-[11px] font-mono uppercase tracking-widest text-steel mb-1">傳真</span><span className="text-base font-mono font-semibold text-ink-text">02-2286-9552</span></div>
                                    </div>
                                </div>

                                {formSubmitted ? (
                                    <div className="bg-clarity/5 rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] p-12 text-center animate-fade-in-up flex flex-col justify-center items-center">
                                        <Icon name="mail" size={44} className="text-clarity mb-6" />
                                        <h3 className="font-serif text-2xl font-bold text-ink-text mb-4">請完成郵件寄送</h3>
                                        <p className="text-steel text-base">請在 Gmail 或郵件軟體確認內容，並按下「傳送／寄送」才算完成申請。使用 Gmail 需先登入您的帳號；網站無法確認郵件是否寄出。若未開啟，可使用下方按鈕重試，或直接寄信至 trt9002@yahoo.com.tw。</p>
                                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                                            <button type="button" onClick={(e) => handleFormSubmit(e, 'gmail')} className="bg-clarity text-white px-5 py-3">開啟 Gmail 寄送</button>
                                            <button type="button" onClick={(e) => handleFormSubmit(e, 'other')} className="border border-steel/30 px-5 py-3">使用其他郵件軟體</button>
                                        </div>
                                        <button onClick={() => setFormSubmitted(false)} className="mt-8 text-clarity font-mono text-sm underline">重新填寫</button>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] p-8">
                                        <form onSubmit={handleFormSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-mist border border-steel/25 px-5 py-3.5 focus:outline-none focus:border-clarity text-base" placeholder="您的姓名 *" aria-label="您的姓名" />
                                                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-mist border border-steel/25 px-5 py-3.5 focus:outline-none focus:border-clarity text-base" placeholder="聯絡電話 *" aria-label="聯絡電話" />
                                            </div>
                                            <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-mist border border-steel/25 px-5 py-3.5 focus:outline-none focus:border-clarity text-base" placeholder="公司名稱與部門 *" aria-label="公司名稱與部門" />
                                            <label className="block text-sm text-steel">指定藥劑（選填）
                                                <input type="text" value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} className="mt-2 w-full bg-mist border border-steel/25 px-5 py-3.5 text-base" />
                                            </label>
                                            <input type="text" value={formData.waterType} onChange={(e) => setFormData({...formData, waterType: e.target.value})} className="w-full bg-mist border border-steel/25 px-5 py-3.5 focus:outline-none focus:border-clarity text-base" placeholder="廢水類型（如 PCB、化學鎳）" aria-label="廢水類型" />
                                            <div>
                                                <span className="block text-xs font-mono uppercase tracking-widest text-steel mb-2">關注的處理項目（可複選）</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {['COD', '金屬', '氰化物', '氟', '總氮'].map((compound) => (
                                                        <label key={compound} className={`px-3.5 py-2 text-sm font-mono border cursor-pointer transition-all ${formData.compounds.includes(compound) ? 'bg-clarity text-ink border-clarity' : 'bg-mist text-steel border-steel/25'}`}>
                                                            <input type="checkbox" className="sr-only" checked={formData.compounds.includes(compound)} onChange={() => handleCheckboxChange(compound)} />
                                                            {compound}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <select value={formData.needType} onChange={(e) => setFormData({...formData, needType: e.target.value})} className="w-full bg-mist border border-steel/25 px-5 py-3.5 focus:outline-none focus:border-clarity text-base" aria-label="需求類型">
                                                <option>索取藥劑樣品</option>
                                                <option>預約現場勘查</option>
                                                <option>設備報價諮詢</option>
                                                <option>其他技術問題</option>
                                            </select>
                                            <button type="submit" name="provider" value="gmail" className="w-full bg-clarity hover:bg-clarity-light text-ink py-4 font-mono font-semibold text-base tracking-widest uppercase transition-all">使用 Gmail 寄送</button>
                                            <button type="submit" name="provider" value="other" className="w-full border border-steel/30 py-3 text-base text-ink-text">使用其他郵件軟體</button>
                                            <p className="text-sm text-steel">Gmail 會在新分頁開啟並帶入詢問內容，請登入後確認收件人為 trt9002@yahoo.com.tw，再按「傳送」。也可選用其他郵件軟體；網站不會直接寄出或儲存資料。</p>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                    </>) : (
                        <section className="pt-40 pb-32 min-h-[70vh] bg-mist">
                            <div className={`mx-auto px-6 ${(activePage === 'wastewater' || activePage === 'sludge') ? 'max-w-6xl' : 'max-w-3xl'}`}>
                                <button onClick={goHome} className="inline-flex items-center gap-2 font-mono text-sm text-clarity mb-10 hover:underline">
                                    <Icon name="arrow-left" size={14} />回首頁
                                </button>
                                {(() => {
                                    const cat = inquiryCategories.find(c => c.key === activePage);
                                    if (!cat) return null;
                                    return (
                                        <div>
                                            <div className="w-14 h-14 border border-clarity/30 text-clarity flex items-center justify-center mb-6"><Icon name={cat.icon} size={26} /></div>
                                            <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">{cat.sub}</span>
                                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink-text mb-8">{cat.label}</h1>

                                            {activePage === 'wastewater' && (
                                                <div className="mb-14">
                                                    <p className="text-steel text-base md:text-lg leading-relaxed mb-10">
                                                        雷德斯TRT自主研發的水處理藥劑，主要用於去除高濃度工業廢水中的 COD，並針對氟、金屬等污染物提供 95%～99% 的高效去除率，協助客戶穩定達成放流水標準。
                                                    </p>

                                                    <div className="flex flex-wrap gap-3 mb-10" role="group" aria-label="廢水處理頁快速導覽">
                                                        {[['wastewater-tests', '處理實例'], ['wastewater-products', '藥劑產品'], ['wastewater-equipment', '處理設備']].map(([id, label]) => <button type="button" key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="bg-white border border-steel/20 rounded-full px-4 py-2 text-sm text-ink-text hover:border-clarity">{label}</button>)}
                                                    </div>
                                                    <WastewaterTestCase onContact={() => {
                                                        setFormSubmitted(false);
                                                        setFormData(previous => ({ ...previous, waterType: '高濃度化學鎳廢液', product: 'MC2 金屬捕集劑', needType: '其他技術問題' }));
                                                        goToContactSection();
                                                    }} />
                                                    <WastewaterTestCase variant="zinc" onContact={() => {
                                                        setFormSubmitted(false);
                                                        setFormData(previous => ({ ...previous, waterType: '鋅鎳合金鍍液（依線上比例稀釋 20 倍）', product: '藥劑一／藥劑二／藥劑三', needType: '其他技術問題' }));
                                                        goToContactSection();
                                                    }} />

                                                    <div className="bg-white rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] p-8 md:p-10 mb-14">
                                                        <span className="font-mono text-clarity text-xs uppercase tracking-widest inline-flex items-center gap-2 mb-3">
                                                            <Icon name="droplet" size={14} />高低濃度工業廢水處理解決方案
                                                        </span>
                                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-4">雷德斯TRT水處理開發藥劑</h2>
                                                        <p className="text-steel font-light text-base leading-relaxed mb-8">雷德斯減廢科技所開發的廢水處理藥劑，解決您工廠高濃度COD的處理效率並具穩定度，將製程高濃度廢液廢水降低至放流水標準100mg/L以下；連同其他各項藥劑及設備搭配之不同種類工業廢水廢液處理效果參考如下：</p>
                                                        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                                                            {wastewaterResults.map((r, i) => (
                                                                <div key={i} className="flex items-start gap-3">
                                                                    <Icon name="flask-conical" size={17} className="text-clarity shrink-0 mt-0.5" />
                                                                    <p className="text-sm text-steel font-light leading-relaxed">{r}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div id="wastewater-equipment" className="scroll-mt-28 bg-white rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] p-8 md:p-10">
                                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-4">雷德斯減廢科技 專業廢水處理設備</h2>
                                                        <p className="text-steel font-light text-base leading-relaxed mb-8">雷德斯TRT研發的廢水處理設備，具備新型專利設計，且能依客戶目標，從水質、濃度、水量以及設備佔地空間等，客製出滿足客戶整體需求的系統規劃，大幅提升工廠製程廢液的處理效能，豐富的國內外工程實績，優良口碑相傳。雷德斯獨家廢水處理設備，擁有多項競爭優勢與特色，茲舉例如下：</p>
                                                        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                                                            {wastewaterEquipmentFeatures.map((f, i) => (
                                                                <div key={i} className="flex items-start gap-3">
                                                                    <Icon name="droplet" size={17} className="text-clarity shrink-0 mt-0.5" />
                                                                    <p className="text-sm text-steel font-light leading-relaxed">{f}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div id="wastewater-products" className="scroll-mt-28 mt-16 mb-8">
                                                        <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">Chemical Reagents Portfolio</span>
                                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-2">TRT 藥劑產品系列</h2>
                                                        <p className="hidden lg:block text-steel font-light text-base">點選左側類別與品項，右側即時顯示藥劑外觀、適用對象與技術特性。</p>
                                                        <p className="lg:hidden text-steel font-light text-base">選擇類別後，點一下藥劑名稱，即可開啟圖片與產品介紹。</p>
                                                    </div>
                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                                        <div className="lg:col-span-5 space-y-3">
                                                            {Object.keys(chemicalDatabase).map((groupKey) => (
                                                                <div key={groupKey} className="border border-steel/25">
                                                                    <button
                                                                        onClick={() => { setSelectedChemGroup(groupKey); setSelectedChemId(chemicalDatabase[groupKey].items[0].id); }}
                                                                        className={`w-full text-left p-4 font-mono text-sm font-medium tracking-wide flex justify-between items-center transition-colors ${selectedChemGroup === groupKey ? 'bg-ink text-clarity-light' : 'bg-mist text-ink-text hover:bg-white'}`}
                                                                    >
                                                                        <span>{chemicalDatabase[groupKey].groupTitle}</span>
                                                                        <Icon name={selectedChemGroup === groupKey ? 'chevron-down' : 'chevron-right'} size={16} />
                                                                    </button>
                                                                    {selectedChemGroup === groupKey && (
                                                                        <div className="bg-white divide-y divide-steel/15 animate-fade-in-up">
                                                                            {chemicalDatabase[groupKey].items.map((item) => (
                                                                                <button key={item.id} onClick={() => selectChemical(item.id)} aria-haspopup="dialog"
                                                                                    className={`w-full text-left p-3.5 text-sm font-medium tracking-wide flex justify-between items-center transition-all ${selectedChemId === item.id ? 'bg-clarity/5 text-clarity pl-5 border-l-2 border-clarity' : 'text-steel hover:bg-mist'}`}>
                                                                                    <span>{item.name}</span>
                                                                                    <span className="text-[10px] font-mono uppercase opacity-70 border border-current px-1.5 py-0.5">{item.type}</span>
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="hidden lg:block lg:col-span-7">
                                                            {currentChem && (
                                                                <div className="rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] p-8 bg-white sticky top-28">
                                                                    <div className="bg-mist border border-steel/15 p-6 mb-6 flex justify-center items-center h-64 overflow-hidden">
                                                                        {currentChem.imgUrl ? (
                                                                            <img loading="lazy" decoding="async" src={currentChem.imgUrl} alt={currentChem.name} className="max-h-full max-w-full object-contain" />
                                                                        ) : (
                                                                            <div className="flex flex-col items-center gap-3 text-steel/50">
                                                                                <Icon name={currentChem.type === '粉體' ? 'package' : 'beaker'} size={56} />
                                                                                <span className="text-[11px] font-mono tracking-widest uppercase">{currentChem.type} 劑型</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <MonoTag>{currentChem.type} 藥劑</MonoTag>
                                                                    <h4 className="font-serif text-2xl font-bold text-ink-text mt-4 mb-4">{currentChem.name}</h4>
                                                                    <p className="text-steel text-base leading-relaxed font-light border-t border-steel/15 pt-4">{currentChem.desc}</p>
                                                                    <button onClick={requestSample} className="mt-6 w-full bg-clarity hover:bg-clarity-light text-ink font-mono font-semibold text-center py-4 text-sm tracking-widest uppercase transition-all">立即索取此藥劑樣品</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {activePage === 'sludge' && (
                                                <div className="mb-14">
                                                    <div className="grid sm:grid-cols-2 gap-6 mb-14">
                                                        <div className="bg-white rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] hover:shadow-[0_16px_40px_-14px_rgba(16,32,31,0.32)] transition-shadow p-7 flex flex-col gap-4">
                                                            <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center"><Icon name="disc-3" size={22} /></div>
                                                            <MonoTag>脫水成形</MonoTag>
                                                            <h3 className="font-serif text-xl font-bold text-ink-text">高效脫水機成形</h3>
                                                            <p className="text-sm text-steel font-light leading-relaxed">污泥經脫水機加壓成形，含水率可降至 75% 以下，大幅減少後續乾燥與清運負擔。</p>
                                                            <p className="text-sm font-mono font-medium text-ink-text border-t border-steel/20 pt-3">脫水成形含水率可達 75%</p>
                                                        </div>
                                                        <div className="bg-white rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] hover:shadow-[0_16px_40px_-14px_rgba(16,32,31,0.32)] transition-shadow p-7 flex flex-col gap-4">
                                                            <div className="w-11 h-11 border border-clarity/30 text-clarity flex items-center justify-center"><Icon name="flame" size={22} /></div>
                                                            <MonoTag>低溫乾燥</MonoTag>
                                                            <h3 className="font-serif text-xl font-bold text-ink-text">熱煤油恆溫負壓乾燥</h3>
                                                            <p className="text-sm text-steel font-light leading-relaxed">污泥乾燥機 1 噸污泥經 14 小時處理，可使含水率降至 5% 以下；採熱煤油加熱方式具保溫效果，負壓抽氣不與外界空氣接觸，並透過攪拌加熱增加受熱面積，有效去除水分。</p>
                                                            <p className="text-sm font-mono font-medium text-ink-text border-t border-steel/20 pt-3">1噸 / 14小時，含水率降至 5% 以下</p>
                                                        </div>
                                                    </div>

                                                    <div className="mb-8">
                                                        <span className="font-mono text-clarity tracking-widest text-xs uppercase block mb-3">Our Equipment</span>
                                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-2">污泥處理設備</h2>
                                                        <p className="text-steel font-light text-base">雷德斯TRT自有專利研發之污泥脫水與乾燥設備，實際運轉於客戶現場，長年穩定運作。</p>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {sludgeEquipment.map((eq, i) => (
                                                            <div key={i} className="bg-white flex flex-col rounded-xl overflow-hidden shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] hover:shadow-[0_16px_40px_-14px_rgba(16,32,31,0.32)] transition-shadow">
                                                                <div className="h-64 overflow-hidden">
                                                                    <img loading="lazy" decoding="async" src={eq.imgUrl} alt={eq.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div className="p-7 flex flex-col gap-4 flex-grow">
                                                                    <h3 className="font-serif text-xl font-bold text-ink-text">{eq.name}</h3>
                                                                    <span className="font-mono text-clarity text-xs uppercase tracking-widest">工業廢水工程設備特色</span>
                                                                    <ul className="space-y-2">
                                                                        {eq.features.map((f, fi) => (
                                                                            <li key={fi} className="flex items-start gap-2 text-sm text-steel font-light leading-relaxed">
                                                                                <Icon name="check" size={15} className="text-clarity shrink-0 mt-0.5" />{f}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {activePage === 'automation' && (
                                                <div className="mb-14">
                                                    <p className="text-steel text-base md:text-lg leading-relaxed mb-10">
                                                        廢水廠各處理接點採用 PLC（可程式控制器）人機介面進行監控與設定異常上下限，當接點數值超過上下限時會產生異常訊息紀錄與燈號，現場人員只需以燈號判別再前往處理即可，大幅提升廠務監控效率與應變速度。
                                                    </p>

                                                    <div className="bg-white rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] p-8 md:p-10">
                                                        <span className="font-mono text-clarity text-xs uppercase tracking-widest inline-flex items-center gap-2 mb-3">
                                                            <Icon name="cpu" size={14} />PLC 監控系統
                                                        </span>
                                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-4">人機自動化監控機制</h2>
                                                        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                                                            {automationFeatures.map((f, i) => (
                                                                <div key={i} className="flex items-start gap-3">
                                                                    <Icon name="bell" size={17} className="text-clarity shrink-0 mt-0.5" />
                                                                    <p className="text-sm text-steel font-light leading-relaxed">{f}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="rounded-xl shadow-[0_10px_30px_-14px_rgba(16,32,31,0.25)] bg-white p-8 md:p-10">
                                                <p className="text-steel leading-relaxed text-base mb-6">
                                                    {(activePage === 'wastewater' || activePage === 'sludge' || activePage === 'automation')
                                                        ? `以上為「${cat.label}」相關技術與藥劑資訊，實際導入方案需依現場水質與產量客製，歡迎直接聯繫我們安排評估。`
                                                        : `這個分類頁面的詳細內容整理中，會陸續補上完整的技術說明與案例。如果您現在就需要「${cat.label}」相關的協助，歡迎直接聯繫我們，會有專人為您服務。`}
                                                </p>
                                                <div className="flex flex-wrap gap-4 pt-6 border-t border-steel/15">
                                                    <a href="tel:0222866693" className="inline-flex items-center gap-2 font-mono text-base text-ink-text hover:text-clarity"><Icon name="phone" size={15} className="text-clarity" />02-2286-6693</a>
                                                    <a href="mailto:trt9002@yahoo.com.tw" className="inline-flex items-center gap-2 font-mono text-base text-ink-text hover:text-clarity"><Icon name="mail" size={15} className="text-clarity" />trt9002@yahoo.com.tw</a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </section>
                    )}

                    {chemicalDialogOpen && activePage === 'wastewater' && currentChem && (
                        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 backdrop-blur-sm p-3" onClick={() => setChemicalDialogOpen(false)}>
                            <div ref={chemicalDialogRef} role="dialog" aria-modal="true" aria-labelledby="chemical-dialog-title" tabIndex={-1}
                                className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90dvh] overflow-y-auto overscroll-contain animate-fade-in-up"
                                onClick={(event) => event.stopPropagation()}>
                                <div className="sticky top-0 z-10 bg-white border-b border-steel/15 px-5 py-3 flex items-center justify-between gap-3">
                                    <span className="text-sm font-medium text-steel">藥劑產品介紹</span>
                                    <button type="button" onClick={() => setChemicalDialogOpen(false)} aria-label="關閉藥劑介紹，返回選單"
                                        className="inline-flex items-center gap-2 px-3 py-2 text-ink-text bg-mist rounded-lg">
                                        <Icon name="x" size={20} />關閉
                                    </button>
                                </div>
                                <div className="p-5">
                                    <h2 id="chemical-dialog-title" className="font-serif text-xl font-bold text-ink-text mb-4">{currentChem.name}</h2>
                                    <div className="bg-mist rounded-lg p-4 mb-5 h-56 flex items-center justify-center overflow-hidden">
                                        {currentChem.imgUrl ? <img src={currentChem.imgUrl} alt={currentChem.name} decoding="async" className="max-h-full max-w-full object-contain" />
                                            : <Icon name={currentChem.type === '粉體' ? 'package' : 'beaker'} size={56} className="text-steel" />}
                                    </div>
                                    <MonoTag>{currentChem.type} 藥劑</MonoTag>
                                    <p className="mt-4 text-steel text-base leading-relaxed">{currentChem.desc}</p>
                                    <button type="button" onClick={requestSample} className="mt-6 w-full bg-clarity text-white rounded-lg px-5 py-4 font-semibold">索取此藥劑樣品</button>
                                    <p className="mt-3 text-sm text-steel">將前往聯絡表單，並自動帶入這款藥劑名稱；填寫後可選擇 Gmail 寄送。</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 頁尾 */}
                    <footer className="bg-ink text-mist py-14 px-6 text-center">
                        <h3 className="font-serif text-xl font-bold mb-2">台灣雷德斯減廢科技股份有限公司</h3>
                        <p className="text-steel text-sm font-mono">統一編號：12755761｜新北市三重區溪尾街126巷15號｜02-2286-6693</p>
                        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] font-mono text-steel tracking-widest uppercase">
                            © 2026 Taiwan Raiders Waste Reduction Technology Corp.
                        </div>
                    </footer>

                    {/* 浮動聯絡按鈕 */}
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                        <a href="tel:0222866693" aria-label="電話聯絡" className="w-14 h-14 bg-clarity text-ink flex items-center justify-center shadow-xl hover:bg-clarity-light transition-all">
                            <Icon name="phone" size={20} />
                        </a>
                        <button onClick={goToContactSection} aria-label="前往聯絡我們" className="w-14 h-14 bg-ink text-clarity-light border border-clarity/40 flex items-center justify-center shadow-xl hover:bg-ink-2 transition-all">
                            <Icon name="message-circle" size={20} />
                        </button>
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    