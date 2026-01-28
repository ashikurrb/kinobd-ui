import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Music2, Phone, Youtube,  } from "lucide-react";

const footerLinks = {
  quick1: [
    "About Us",
    "Privacy Policy",
    "Cookie Policy",
    "Terms & Conditions",
    "Why shop with us",
  ],
  quick2: [
    "About Us",
    "Privacy Policy",
    "Cookie Policy",
    "Terms & Conditions",
    "Why shop with us",
  ],
  legal: ["Policy", "Term & Conditions", "Shipping", "Return", "FAQs"],
};

const socialMedia = [
  { icon: Facebook, url: "https://www.facebook.com/kinobd" },
  { icon: Instagram, url: "https://www.instagram.com/kinobd" },
  { icon: Linkedin, url: "https://www.linkedin.com/company/kinobd" },
  { icon: Phone, url: "https://www.whatsapp.com/kinobd" },
  { icon: Youtube, url: "https://www.youtube.com/kinobd" },
  { icon: Music2, url: "https://www.tiktok.com/@kinobd" }
];
const Footer = () => {
  return (
    <footer className="w-full text-white font-sans">
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #086D67 0%, #032C2A 100%)",
        }}
      >
        <div className="lg:px-30 xl:px-60 px-5 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-20">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#00E5FF]">
                About Kinobd
              </h3>
              <p className="text-[15px] leading-relaxed text-slate-200 max-w-md">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Proin vel leo id mi sollicitudin
                tristique vitae sit amet velit. Praesent sit amet semper mauris,
                eu pulvinar ipsum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#00E5FF]">Quick Link</h3>
                <ul className="space-y-4 text-[15px]">
                  {footerLinks.quick1.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="text-[#00E5FF]">•</span>
                      <Link
                        href="#"
                        className="text-slate-200 group-hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Link 2 */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#00E5FF]">Quick Link</h3>
                <ul className="space-y-4 text-[15px]">
                  {footerLinks.quick2.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="text-[#00E5FF]">•</span>
                      <Link
                        href="#"
                        className="text-slate-200 group-hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#00E5FF]">Legal Info</h3>
                <ul className="space-y-4 text-[15px]">
                  {footerLinks.legal.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="text-[#00E5FF]">•</span>
                      <Link
                        href="#"
                        className="text-slate-200 group-hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col xl:flex-row justify-between items-center gap-10 border-t border-white/10 pt-10">
            {/* Follow Us */}
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              <h3 className="text-2xl font-bold text-[#00E5FF]">Follow Us</h3>
              <div className="flex gap-3">
                {socialMedia.map((s, index) => (
                  <Link
                    key={index}
                    href={s?.url}
                    className="hover:text-white transition-colors border border-white/20 p-2 rounded-full flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <s.icon size={24} />
                  </Link>
                ))}
              </div>
            </div>

            {/* We Accept */}
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              <h3 className="text-2xl font-bold text-[#00E5FF]">We Accept</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Image
                  src="/payment.png"
                  alt="Accepted Payment Methods"
                  width={260}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div className="bg-[#021F1E] py-6 px-6 md:px-12 lg:px-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm tracking-wide text-slate-400 gap-4">
          <p className="text-center md:text-left">
            &copy; Copyright {new Date().getFullYear()} &nbsp;
            <span className="text-[#FF8A00] font-semibold uppercase">
              KinoBD &nbsp;
            </span>
            Limited , All rights reserved
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
