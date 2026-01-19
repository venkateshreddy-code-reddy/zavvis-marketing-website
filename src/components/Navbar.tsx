import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import glow from "../assets/glow.png";

/* =========================
   NAV WRAPPER
   ========================= */

const Nav = styled.header<{ $scrolled: boolean; $home: boolean }>`
  position: fixed;
  top: 12px;
  left: 0;
  width: 100%;
  z-index: 9999;

  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* transparent only on home when at very top */
  background: ${({ $home, $scrolled }) =>
    $home && !$scrolled
      ? "transparent"
      : `rgba(0, 0, 0, ${$scrolled ? 0.62 : 0.34})`};

  backdrop-filter: ${({ $home, $scrolled }) =>
    $home && !$scrolled ? "none" : "blur(14px)"};
  -webkit-backdrop-filter: ${({ $home, $scrolled }) =>
    $home && !$scrolled ? "none" : "blur(14px)"};

  transition:
    background 220ms ease,
    backdrop-filter 220ms ease;

  @media (max-width: 768px) {
    top: 10px;
    height: 64px;
  }
`;

const NavInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 1320px;
  padding: 0 28px;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media (max-width: 1024px) {
    max-width: 1200px;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    grid-template-columns: auto 1fr auto;
  }
`;

/* =========================
   GLOW (purely visual)
   ========================= */

const NavGlow = styled.div`
  position: absolute;
  top: -520px;
  left: 50%;
  transform: translateX(-50%);

  width: 1200px;
  height: 1200px;

  pointer-events: none;
  z-index: -1;

  background:
    radial-gradient(
      circle at center,
      rgba(155, 120, 255, 0.45) 0%,
      rgba(155, 120, 255, 0.28) 25%,
      rgba(155, 120, 255, 0.16) 40%,
      rgba(155, 120, 255, 0.08) 55%,
      rgba(0, 0, 0, 0) 70%
    );

  filter: blur(8px);

  @media (max-width: 768px) {
    top: -380px;
    width: 820px;
    height: 820px;
    filter: blur(10px);
  }
`;

/* =========================
   LEFT: BRAND (LIGHTER)
   ========================= */

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 220px;

  @media (max-width: 1024px) {
    min-width: 200px;
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const Brand = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  padding: 6px 10px;
  border-radius: 14px;
`;

/* ✨ soft halo behind Zavvis (lighter like the pills) */
const BrandGlow = styled.span<{ $active: boolean }>`
  position: absolute;
  inset: -10px -14px;
  border-radius: 18px;
  pointer-events: none;

  background: transparent;

  filter: blur(6px);
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  transition: opacity 220ms ease;
`;

const Logo = styled.img`
  position: relative;
  z-index: 1;
  height: 44px;

  /* ✅ lighter “Zavvis button” look */
  filter: brightness(1.32) saturate(1.1)
    drop-shadow(0 0 16px rgba(205, 175, 255, 0.35));

  transition:
    filter 180ms ease,
    transform 180ms ease;

  &:hover {
    filter: brightness(1.42) saturate(1.14)
      drop-shadow(0 0 24px rgba(215, 190, 255, 0.55));
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    height: 38px;
  }
`;

/* =========================
   CENTER: DESKTOP MENU
   ========================= */

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuPill = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 26px;
  padding: 10px 28px;
  border-radius: 999px;

  background: rgba(70, 55, 120, 0.26);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  box-shadow:
    0 0 0 1px rgba(140, 90, 255, 0.12),
    0 14px 34px rgba(0, 0, 0, 0.28);
`;

const MenuLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition:
    color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    color: #fff;
    transform: translateY(-1px);
  }
`;

/* =========================
   RIGHT: CTA (DESKTOP) — LIGHTER
   ========================= */

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 220px;

  @media (max-width: 1024px) {
    min-width: 200px;
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const CTAButton = styled.button`
  padding: 12px 34px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  border-radius: 999px;

  /* ✅ lighter gradient like your reference */
  background: linear-gradient(90deg, #8f6bff, #d7b6ff);
  color: #fff;

  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 0 22px rgba(190, 150, 255, 0.45);

  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 0 30px rgba(205, 175, 255, 0.55);
  }

  @media (max-width: 900px) {
    padding: 12px 28px;
  }
`;

const DesktopCTA = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* =========================
   MOBILE TOGGLE + OVERLAY
   ========================= */

const MenuToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  cursor: pointer;
  padding: 10px;
  border-radius: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at top, rgba(140, 90, 255, 0.22), transparent 55%),
    rgba(0, 0, 0, 0.92);
  display: ${({ $open }) => ($open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 9998;
`;

const MobileMenu = styled.div`
  width: 86%;
  max-width: 360px;
  padding: 18px;
  border-radius: 22px;

  background: rgba(25, 18, 40, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;

  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
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
  margin-top: 10px;
`;

/* =========================
   COMPONENT
   ========================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Nav $scrolled={scrolled} $home={isHome}>
        <NavInner>
          <NavGlow />

          <Left>
            <Brand to="/" aria-label="Go to home">
              <BrandGlow $active={isHome && !scrolled} />
              <Logo src={logo} alt="Zavvis" />
            </Brand>
          </Left>

          <Center>
            <MenuPill aria-label="Primary navigation">
              <MenuLink to="/">The Pillars</MenuLink>
              <MenuLink to="/">Why Zavvis</MenuLink>
              <MenuLink to="/">Blog</MenuLink>
              <MenuLink to="/company">Company</MenuLink>
            </MenuPill>
          </Center>

          <Right>
            <DesktopCTA>
              <CTAButton>GET STARTED</CTAButton>
            </DesktopCTA>

            <MenuToggle
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </MenuToggle>
          </Right>
        </NavInner>
      </Nav>

      <MobileOverlay $open={open} onClick={() => setOpen(false)}>
        <MobileMenu onClick={(e) => e.stopPropagation()}>
          <MobileLink to="/" onClick={() => setOpen(false)}>
            The Pillars
          </MobileLink>
          <MobileLink to="/" onClick={() => setOpen(false)}>
            Why Zavvis
          </MobileLink>
          <MobileLink to="/" onClick={() => setOpen(false)}>
            Blog
          </MobileLink>
          <MobileLink to="/company" onClick={() => setOpen(false)}>
            Company
          </MobileLink>
          <MobileCTA onClick={() => setOpen(false)}>GET STARTED</MobileCTA>
        </MobileMenu>
      </MobileOverlay>
    </>
  );
}
