import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export const updateProfile = async (req, res) => {
  const userId = req.user?.id;
  const { username, email, profilePic, oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (profilePic) updateData.profilePic = profilePic;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Password lama salah" });

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, username: true, email: true, profilePic: true }
    });

    res.status(200).json({ message: "Profil berhasil diperbarui", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Gagal update profil", error: err.message });
  }
};
