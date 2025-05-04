import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
  Heart,
  ExternalLink,
  Mail,
  MapPin,
  Globe,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logo from "@/assets/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [heartBeat, setHeartBeat] = useState(false);

  // Footer link sections
  const exploreLinks = [
    { to: "/countries", label: "All Countries" },
    { to: "/regions", label: "Regions" },
    { to: "/favorites", label: "My Favorites" },
    { to: "/compare", label: "Compare Countries" },
    { to: "/trending", label: "Trending" },
  ];

  const resourceLinks = [
    { to: "/about", label: "About Project" },
    { to: "/blog", label: "Blog" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/help", label: "Help Center" },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4 mt-0.5 mr-3 text-blue-600" />,
      content: "SLIIT Campus, New Kandy Road, Malabe, Sri Lanka",
      isLink: false,
    },
    {
      icon: <Mail className="w-4 h-4 mr-3 text-blue-600" />,
      content: "contact@globely.com",
      href: "mailto:contact@globely.com",
      isLink: true,
    },
    {
      icon: <Globe className="w-4 h-4 mr-3 text-blue-600" />,
      content: "www.globely.com",
      href: "https://www.globely.com",
      isLink: true,
    },
    {
      icon: <Clock className="w-4 h-4 mr-3 text-blue-600" />,
      content: "24/7 Support",
      isLink: false,
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      label: "Twitter",
      href: "https://twitter.com",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      href: "mailto:contact@globely.com",
    },
  ];

  // Render link with chevron
  const renderNavLink = (to, label, key) => (
    <Link
      to={to}
      className="flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors group"
      key={key}
    >
      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      {label}
    </Link>
  );

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand/Logo Section */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              <img src={logo} alt="Globely Logo" className="w-12 h-12 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
                Globely
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore the world's countries, cultures, and information all in
              one place. Your ultimate guide to global discovery.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4 pt-2">
              {socialLinks.map((social) => (
                <TooltipProvider key={social.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-9 h-9 hover:bg-blue-100 hover:text-blue-600 transition-all"
                        as={Link}
                        href={social.href}
                      >
                        {social.icon}
                        <span className="sr-only">{social.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-base pb-2 border-b border-muted">
              Explore
            </h3>
            <div className="flex flex-col space-y-3">
              {exploreLinks.map((link) =>
                renderNavLink(link.to, link.label, link.to)
              )}
            </div>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-base pb-2 border-b border-muted">
              Resources
            </h3>
            <div className="flex flex-col space-y-3">
              {resourceLinks.map((link) =>
                renderNavLink(link.href, link.label, link.to)
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-base pb-2 border-b border-muted">
              Contact Us
            </h3>
            <div className="flex flex-col space-y-4">
              {contactInfo.map((item, index) => (
                <div className="flex items-start" key={index}>
                  {item.icon}
                  {item.isLink ? (
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                    >
                      {item.content}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {item.content}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground mb-4 md:mb-0">
            <span>© {currentYear} Manilka Navod</span>
            <span className="mx-2">•</span>
            <span>Built for SLIIT SE3040</span>
          </div>

          <div className="flex items-center space-x-1 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart
              className={`w-4 h-4 text-red-500 ${
                heartBeat ? "scale-125" : "scale-100"
              }`}
              fill="currentColor"
              onMouseEnter={() => setHeartBeat(true)}
              onMouseLeave={() => setHeartBeat(false)}
              style={{ transition: "transform 0.3s ease" }}
            />
            <Link
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-1 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              React
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
