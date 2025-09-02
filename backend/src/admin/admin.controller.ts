import { Request, Response } from 'express';
import { AdminService } from './admin.service';

const adminService = new AdminService();

export const handleCrud = async (req: Request, res: Response) => {
  try {
    const { entity, action, data } = req.body;
    
    if (!entity || !action) {
      return res.status(400).json({ error: 'Entity and action required' });
    }
    
    const result = await adminService.handleCRUD(entity, action, data);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getConfig = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const config = await adminService.getEntityConfig();
    
    res.json({
      admin: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      ...config
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
