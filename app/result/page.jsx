"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, CircularProgress, Typography, Box, Button } from "@mui/material";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_sessions?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        textAlign: "center" 
      }}
    >
      {loading ? (
        <>
          <CircularProgress sx={{ color: "#4CAF50" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "#4CAF50" }}>
            Loading...
          </Typography>
        </>
      ) : error ? (
        <>
          <Typography variant="h6" color="error" sx={{ mb: 4 }}>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Go Back to Home
          </Button>
        </>
      ) : (
        <>
          {session.payment_status === "paid" ? (
            <>
              <Typography variant="h4" sx={{ color: "primary.main", mb: 4 }}>
                Thank you for your purchase!
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Session ID: {session_id}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4 }}>
                  We have received your payment. You will receive an email with the
                  order details shortly.
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4" color="error" sx={{ mb: 4 }}>
                Payment failed
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 4 }}>
                  Your payment was not successful. Please try again.
                </Typography>
              </Box>
            </>
          )}
          <Button variant="contained" color="success" onClick={handleGoBack}>
            Go Back to Home
          </Button>
        </>
      )}
    </Container>
  );
};

export default ResultPage;
