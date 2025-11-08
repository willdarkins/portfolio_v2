const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={href}
  >
    <Icon className="icon-base" />
  </a>
);

export default SocialIcon;
