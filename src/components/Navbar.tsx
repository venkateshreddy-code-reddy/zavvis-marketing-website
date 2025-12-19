import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import glow from "../assets/glow.png";

/* ================= NAV WRAPPER ================= */

const Nav = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;

  /* ✅ SAME feel as hero (NO LINES) */
  background:
    radial-gradient(
      900px 280px at 50% -40px,
      rgba(140, 90, 255, ${({ $scrolled }) => ($scrolled ? 0.22 : 0.16)}),
      rgba(0, 0, 0, 0) 60%
    ),
    rgba(0, 0, 0, ${({ $scrolled }) => ($scrolled ? 0.6 : 0.3)});

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: none;
  box-shadow: none;

  transition: background 220ms ease;

  padding: 12px 0;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const NavInner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 1024px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

/* ================= GLOW ================= */

const NavGlow = styled.div`
  position: fixed;
  top: -520px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 1200px;
  background-image: url(${glow});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.65;
  pointer-events: none;
  z-index: -1;

  @media (max-width: 768px) {
    top: -380px;
    width: 680px;
    height: 900px;
    opacity: 0.8;
  }
`;

/* ================= LOGO ================= */

const Logo = styled.img`
  height: 44px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 38px;
  }
`;

/* ================= DESKTOP MENU ================= */

const DesktopMenu = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 26px;
  padding: 10px 28px;
  border-radius: 999px;

  background: rgba(70, 55, 120, 0.26);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
`;

const MenuLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s ease, transform 0.18s ease;

  &:hover {
    color: #fff;
    transform: translateY(-1px);
  }
`;

/* ================= CTA ================= */

const DesktopCTA = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CTAButton = styled.button`
  padding: 12px 34px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  border-radius: 999px;

  background: linear-gradient(
    90deg,
    rgba(135, 85, 255, 1),
    rgba(175, 120, 255, 1)
  );

  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 14px rgba(160, 120, 255, 0.28);
  cursor: pointer;

  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 22px rgba(160, 120, 255, 0.42);
  }
`;

/* ================= MOBILE ================= */

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at top, rgba(140, 90, 255, 0.22), transparent 55%),
    #000;
  display: ${({ $open }) => ($open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 9998;
`;

const MobileMenu = styled.div`
  width: 84%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: center;
`;

const MobileLink = styled(MenuLink)`
  font-size: 18px;
  padding: 12px 0;
  border-radius: 999px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const MobileCTA = styled(CTAButton)`
  margin-top: 18px;
`;

/* ================= COMPONENT ================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <NavInner>
          <NavGlow />

          <Logo src={logo} alt="Zavvis" />

          <DesktopMenu>
            <MenuPill>
              <MenuLink to="/">The Pillars</MenuLink>
              <MenuLink to="/">Why Zavvis</MenuLink>
              <MenuLink to="/">Blog</MenuLink>
              <MenuLink to="/company">Company</MenuLink>
            </MenuPill>
          </DesktopMenu>

          <DesktopCTA>
            <CTAButton>GET STARTED</CTAButton>
          </DesktopCTA>

          <MenuToggle onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </MenuToggle>
        </NavInner>
      </Nav>

      <MobileOverlay $open={open}>
        <MobileMenu>
          <MobileLink to="/" onClick={() => setOpen(false)}>The Pillars</MobileLink>
          <MobileLink to="/" onClick={() => setOpen(false)}>Why Zavvis</MobileLink>
          <MobileLink to="/" onClick={() => setOpen(false)}>Blog</MobileLink>
          <MobileLink to="/company" onClick={() => setOpen(false)}>Company</MobileLink>
          <MobileCTA onClick={() => setOpen(false)}>GET STARTED</MobileCTA>
        </MobileMenu>
      </MobileOverlay>
    </>
  );
}
