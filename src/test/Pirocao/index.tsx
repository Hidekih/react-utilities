import React, { ReactNode } from "react"; 

import { PirocaoContainer } from "./Pirocao.styles"; 

export type PirocaoProps = { 
	children: ReactNode;  
}

export const Pirocao = ({ children, ...props }: PirocaoProps) => { 
	return ( 
		<PirocaoContainer> 
			{children} 
		</PirocaoContainer> 
	) 
}
